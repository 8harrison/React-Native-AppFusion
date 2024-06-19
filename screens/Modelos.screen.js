import { View, FlatList, StyleSheet, Pressable, Vibration } from 'react-native';
import { useContext, useState } from 'react';
import CardModelo from '../components/CardModelo';
import ModalView from '../components/ModalView';
import { ContextValue } from '../context/ContextValue';
import OptionList from '../components/OptionList';
import CardModeloAcessorios from '../components/CardModeloAcessorios';
import Entypo from '@expo/vector-icons/Entypo';
import CustomButton from '../components/CustomButton';

const m = {
  nome: '',
  motor: '',
  tipoCombustivel: '',
  anoModelo: '',
  imagem: '',
  fazendo: [],
  feito: [],
};

export default function Modelos() {
  const { modelos } = useContext(ContextValue);
  const [filtro, setFiltro] = useState();
  const [mod, setMod] = useState(m);

  const findModel = (nome) => {
    const modelo = modelos.find((el) => el.nome == nome);
    setMod(modelo);
    setFiltro({ filtro: modelo.fazendo, label: 'FAZENDO' });
  };

  const voltar = () => {
    setMod('Padrão');
  };

  const filtroFeito = () => {
    Vibration.vibrate();
    setFiltro({ filtro: mod.feitos, label: 'FEITOS' });
  };

  const filtroFazendo = () => {
    Vibration.vibrate();
    setFiltro({ filtro: mod.fazendo, label: 'FAZENDO' });
  };

  const opcoes = modelos.map((mod) => mod.nome);

  return (
    <View style={styles.container}>
      <ModalView />
      <OptionList
        opcoes={opcoes}
        title="MODELO"
        value={mod.nome || ''}
        setValue={(v) => findModel(v)}
      />
      {!mod.nome ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
          data={modelos}
          renderItem={({ item }) => <CardModelo item={item} />}
        />
      ) : (
        <View style={{ width: '100%' }}>
          <View style={styles.btnContainer}>
            <Pressable onPress={voltar} style={{ width: 50, height: 50 }}>
              <Entypo name="arrow-bold-left" size={24} color="black" />
            </Pressable>
            <CustomButton
              title="FAZENDO"
              style={styles.btn}
              textStyle={styles.txtBtn}
              action={filtroFazendo}
            />
            <CustomButton
              title="FEITOS"
              style={styles.btn}
              textStyle={styles.txtBtn}
              action={filtroFeito}
            />
          </View>
          <CardModeloAcessorios item={mod} filtro={filtro} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 30,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '6%',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    width: '100%',
  },
  txtBtn: {
    color: 'white',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'black',
    justifyContent: 'center',
    width: 85,
    height: 30,
  },
});
