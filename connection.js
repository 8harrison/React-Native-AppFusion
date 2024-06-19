import { firebaseConfig } from './firebaseConfig';
import * as firebase from 'firebase';
import { reduceDuplo, reduceSimples } from './utils';
import { styles } from './styles/DashBoard.style';

let dbRef;

try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.log('App em carregamento');
}
dbRef = firebase.database().ref('/modelos-fabricados/');

export const login = async (email, password) => {
  const auth = firebase.auth();
  const user = await auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const isLogged = (setUser) => {
  const auth = firebase.auth();
  auth.onAuthStateChanged((res) => {
    setUser(res);
  });
};

export async function salvaImagem(blob) {
  const timestamp = Date.now();
  const fileRef = firebase.storage().ref('fotos-modelos/');
  const result = fileRef.child(timestamp.toString()).put(blob);
  let imageurl = '';
  imageurl = await result.then((response) => response.downloadURL);
  return imageurl;
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  return await salvaImagem(blob);
}

export const getModelos = async (setModelos, setData) => {
  const auth = firebase.auth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      dbRef.on('value', (snapshot) => {
        const modelos = [];
        if (snapshot.exists()) {
          snapshot.forEach((response) => {
            const fazendo = [];
            const feitos = [];
            const data = response.val();
            if (data.fazendo) {
              Object.entries(data.fazendo).forEach(([key, value]) => {
                fazendo.push({ ...value, key });
              });
            }
            if (data.feitos) {
              Object.entries(data.feitos).forEach(([key, value]) => {
                feitos.push({ ...value, key });
              });
            }
            modelos.push({ ...data, key: response.key, fazendo, feitos });
          });
        }
        const data = chargeData(modelos);
        setData(data);
        setModelos(modelos);
      });
    }
  });
};

const chargeData = (modelos) => {
  const fazendo = reduceDuplo(modelos, 'fazendo');
  const feito = reduceDuplo(modelos, 'feitos');
  const dados = [
    { nome: 'Total', fazendo, feito, estilos: styles({ fazendo, feito }) },
  ];
  modelos.forEach((el) => {
    const fazendo = reduceSimples(el, 'fazendo');
    const feito = reduceSimples(el, 'feitos');
    dados.push({
      nome: el.nome,
      fazendo,
      feito,
      estilos: styles({ fazendo, feito }),
    });
  });
  return dados;
};

export async function atualizaModelo(modelo, key) {
  await dbRef.child(key).set(modelo);
}

export function removeModelo(key) {
  dbRef
    .child(key)
    .remove()
    .then(() => {
      console.log('Excluiu');
    })
    .catch((error) => {
      console.log('Erro ao excluir ', error);
    });
}

export const salvaModelo = async (modelo) => {
  const imagemURL = await uploadImageAsync(modelo.imagem);
  modelo.imagem = imagemURL;
  const key = firebase
    .database()
    .ref()
    .child('modelos-fabricados/')
    .push(modelo).key;

  return { ...modelo, key };
};

export const salvaFazendo = (acessorios, modeloKey) => {
  dbRef.child(modeloKey).child('/fazendo').push(acessorios).key;
};

const atualizaFazendo = (acessorios, modeloKey, acessorioKey) => {
  dbRef.child(modeloKey).child('/fazendo').child(acessorioKey).set(acessorios);
};

const salvaFeito = (acessorios, modeloKey, acessorioKey) => {
  dbRef.child(modeloKey).child('feitos').child(acessorioKey).set(acessorios);
};

export const atualizaFazendoEFeito = (modeloKey, acessorioKey) => {
  dbRef
    .child(modeloKey)
    .child(`fazendo`)
    .child(acessorioKey)
    .once('value', (data) => {
      const fazendo = data.val();
      fazendo.quantidade--;
      if (fazendo.quantidade == 0) {
        removeFazendo(modeloKey, acessorioKey);
      } else {
        atualizaFazendo(fazendo, modeloKey, acessorioKey);
      }
      dbRef
        .child(modeloKey)
        .child(`feitos`)
        .child(acessorioKey)
        .once('value', (data) => {
          let feito;
          if (data.exists()) {
            feito = data.val();
            feito.quantidade++;
          } else {
            feito = { ...fazendo, quantidade: 1 };
          }
          salvaFeito(feito, modeloKey, acessorioKey);
        });
    });
};

export const reverteAtualizacaoFazendoFeito = (modeloKey, acessorioKey) => {
  dbRef
    .child(modeloKey)
    .child('feitos')
    .child(acessorioKey)
    .once('value', (data) => {
      const feitos = data.val();
      feitos.quantidade--;
      if (feitos.quantidade == 0) {
        removeFeito(modeloKey, acessorioKey);
      } else {
        dbRef.child(modeloKey).child('feitos').child(acessorioKey).set(feitos);
      }
      dbRef
        .child(modeloKey)
        .child('fazendo')
        .child(acessorioKey)
        .once('value', (data) => {
          let fazendo;
          if (data.exists()) {
            fazendo = data.val();
            fazendo.quantidade++;
          } else {
            fazendo = { ...feitos, quantidade: 1 };
          }
          atualizaFazendo(fazendo, modeloKey, acessorioKey);
        });
    });
};

const removeFeito = (modeloKey, acessorioKey) => {
  dbRef
    .child(modeloKey)
    .child('feitos')
    .child(acessorioKey)
    .remove()
    .then(() => {
      console.log('Excluiu');
    })
    .catch((error) => {
      console.log('Erro ao excluir ', error);
    });
};

const removeFazendo = (modeloKey, acessorioKey) => {
  dbRef
    .child(modeloKey)
    .child('fazendo')
    .child(acessorioKey)
    .remove()
    .then(() => {
      console.log('Excluiu');
    })
    .catch((error) => {
      console.log('Erro ao excluir ', error);
    });
};

export const closeConnection = () => {
  firebase.database().ref('modelos-fabricados/').off();
};
