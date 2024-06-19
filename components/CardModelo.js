import { View, Image, Text, StyleSheet, Vibration } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import GestureCompnent from './GestureComponent';
import { useContextFactory } from '../context/ContextValue';
import { atualizaFazendoEFeito, reverteAtualizacaoFazendoFeito } from '../connection';

export default function CardModelo({ item }) {
  const { nome, imagem, motor, tipoCombustivel, anoModelo, fazendo, feitos } =
    item;

  const { setModalVisible, setModelo } = useContextFactory();

  const adicionarFila = () => {
    setModelo(item);
    setModalVisible(true);
  };

  const produzirUm = () => {
    if (item.fazendo.length > 0) {
      Vibration.vibrate();
      atualizaFazendoEFeito(item.key, item.fazendo[0].key);
    }
  };

  const retornaPtroducao = () => {
    const tamanhoFeitos = item.feitos.length;
    if (tamanhoFeitos > 0) {
      Vibration.vibrate();
      reverteAtualizacaoFazendoFeito(item.key, item.feitos[tamanhoFeitos - 1].key);
    }
  };

  const totalFazendo = fazendo.reduce((acc, e) => e.quantidade + acc, 0);
  const totalFeito = feitos.reduce((acc, e) => e.quantidade + acc, 0);
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    
      <GestureCompnent
        style={styles.container}
        rightFunction={produzirUm}
        longPress={adicionarFila}
        leftFunction={retornaPtroducao}>
        <Image
          style={styles.img}
          source={{ uri: imagem.uri ? imagem.uri : imagem }}
        />
        <View style={styles.txtContainer}>
          <View>
            <Text style={styles.nome}>Modelo: {nome}</Text>
            <Text>Motor: {motor}</Text>
            <Text>Combustível: {tipoCombustivel}</Text>
            <Text>Ano: {anoModelo}</Text>
          </View>
          <View>
            <Text>
              <View style={[styles.indicador, styles.fazendo]}></View>{' '}
              {totalFazendo}
            </Text>
            <Text>
              <View style={[styles.indicador, styles.feito]}></View>{' '}
              {totalFeito}
            </Text>
          </View>
        </View>
      </GestureCompnent>
  
  );
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 140,
    borderRadius: 10,
    marginBottom: 5,
  },
  container: {
    paddingHorizontal: 30,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    paddingTop: 20,
    marginBottom: 20,
    paddingBottom: 10,
  },
  nome: {
    fontSize: 24,
    fontFamily: 'Inter_900Black',
  },
  txtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 10,
  },
  indicador: {
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  fazendo: {
    backgroundColor: 'orange',
  },
  feito: {
    backgroundColor: '#38A687',
  },
});
