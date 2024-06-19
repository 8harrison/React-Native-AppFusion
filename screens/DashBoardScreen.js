import { View, Text, FlatList } from 'react-native';
import { useContext } from 'react';
import { styles } from '../styles/DashBoard.style';
import {ContextValue} from '../context/ContextValue'

export default function DashBoardScreen() {
  const {data} = useContext(ContextValue)

  const estilos = styles(data);

  return (
    <View style={estilos.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        data={data}
        renderItem={({ item }) => (
          <View style={estilos.chartContainer}>
            <Text style={estilos.chartTitle}>
              {item.nome}: {item.fazendo} / {item.feito}
            </Text>
            <View style={item.estilos.fazendo}></View>
            <View style={item.estilos.feito}></View>
          </View>
        )}
      />
      <View style={estilos.containerLegenda}>
        <View style={estilos.subContainerLegenda}>
          <View style={estilos.legendaFinalizado}></View>
          <Text style={estilos.txtLegenda}>Finalizado</Text>
        </View>
        <View style={estilos.subContainerLegenda}>
          <View style={estilos.legendaFazendo}></View>
          <Text style={estilos.txtLegenda}>Produção</Text>
        </View>
      </View>
    </View>
  );
}
