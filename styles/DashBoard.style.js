import { StyleSheet } from 'react-native';

export const styles = (data) => {
  const total = data.fazendo + data.feito;
  const razFazendo = (data.fazendo * 100) / total;
  const razFeito = (data.feito * 100) / total;
  const style = StyleSheet.create({
    fazendo: {
      backgroundColor: 'orange',
      width: `${razFazendo}%`,
      height: 30,
    },
    feito: {
      backgroundColor: '#38A687',
      width: `${razFeito}%`,
      height: 30,
      marginTop: 10,
      marginBottom: 40,
    },
    container: {
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 30,
      backgroundColor: 'white',
      height: '100%',
    },
    chartContainer: {
      width: '100%',
    },
    chartTitle: {
      fontSize: 20,
      marginBottom: 10,
    },
    legendaFazendo: {
      backgroundColor: 'orange',
      width: 70,
      height: 30,
    },
    legendaFinalizado: {
      backgroundColor: '#38A687',
      width: 70,
      height: 30,
    },
    containerLegenda: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
    },
    subContainerLegenda: {
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 80,
    },
    txtLegenda: {
      fontSize: 24,
      color: 'grey',
    },
  });
  return style;
};
