import { Text, FlatList, View, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function OptionList({ opcoes, title, value, setValue }) {
  const [habilita, setHabilita] = useState(false);
  const seleciona = (item) => {
    setValue(item);
    setHabilita(false)
  };
  return (
    <View style={styles.container}>
    <View style={styles.caixaSelecao}>
      <Text  onPress={() => setHabilita(!habilita)}>
        {title}: {value}
      </Text>
      </View>
      {habilita && (
        <View style={styles.listContainer}>
          <FlatList
            data={opcoes}
            renderItem={({ item }) => (
              <Text style={styles.opcoes} onPress={() => seleciona(item)}>
               {'    '}{item}
              </Text>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    marginTop: 35,
    width: '100%',
    zIndex: 2 
  },
  opcoes: {
    color: 'white',
    paddingVertical: 3,
    width: '100%',
    fontSize: 18,
  },
  caixaSelecao: {
    borderWidth: 1,   
    paddingVertical: 10,
    width: '100%',
    borderRadius: 10,
    paddingStart: 10,
  },
  container: {
    width: '100%',
    marginBottom: 5
  }
});
