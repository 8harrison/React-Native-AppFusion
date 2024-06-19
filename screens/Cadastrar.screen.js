import { View, StyleSheet } from 'react-native';
import CadastrarForm from '../components/CadastroForm';

export default function CadastrarScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CadastrarForm navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: 'white',
    height: '100%'
  },
});
