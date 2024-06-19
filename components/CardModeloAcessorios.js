import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native'; 

export default function CardModeloAcessorios({ item, filtro }) {
  const { nome, imagem, motor, tipoCombustivel, anoModelo } = item;

  return (
    <View style={{ height: '88%' }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filtro.filtro}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text style={[styles.contador, styles[filtro.label]]}>
              {item.quantidade}
            </Text>
            <ImageBackground
              style={styles.img}
              source={{
                uri: imagem.uri ? imagem.uri : imagem,
              }}></ImageBackground>
            <View style={styles.txtContainer}>
              <View>
                <Text style={styles.nome}>Modelo: {nome}</Text>
                <View style={styles.subTxtContainer}>
                  <View>
                    <Text>Motor: {motor}</Text>
                    <Text>Combustível: {tipoCombustivel}</Text>
                    <Text>Ano: {anoModelo}</Text>
                    <Text>
                      Ar-Condicionado: {item.acessorios.arCondicionado}
                    </Text>
                  </View>
                  <View>
                    <Text>Cor: {item.acessorios.cor}</Text>
                    <Text>Cambio: {item.acessorios.cambio}</Text>
                    <Text>Vidro eletrico: {item.acessorios.vidroEletrico}</Text>
                    <Text>N° de Portas: {item.acessorios.nPortas}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
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
    marginBottom: 30,
    paddingBottom: 10,
    alignItems: 'flex-end',
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
  subTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  contador: {
    textAlign: 'right',
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 22,
    fontWeight: 600,
    position: 'absolute',
    marginTop: 10, 
    right: 20,
    zIndex: 1
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20
  },
  FAZENDO: {
    backgroundColor: 'orange',
  },
  FEITOS: {
    backgroundColor: '#38A687',
  },
});
