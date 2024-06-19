import {
  View,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { verificaInputs } from '../utils';
import { salvaModelo } from '../connection';
import CustomButton from './CustomButton';

export default function CadastrarForm({ navigation }) {
  const [modelo, setModelo] = useState({
    nome: '',
    motor: '',
    tipoCombustivel: '',
    anoModelo: '',
    imagem: '',
  });

  const cadastrar = async () => {
    const liberar = verificaInputs(modelo);
    if (liberar) {
      salvaModelo(modelo);
    } else {
      alert('HOJE NÃO, AMIGO!');
    }
    resetarInputs();
    navigation.navigate('MODELOS');
  };

  const resetarInputs = () => {
    setModelo({
      nome: '',
      motor: '',
      tipoCombustivel: '',
      anoModelo: '',
      imagem: '',
    });
  };

  const escolherFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      legacy: true,
    });
    if (!result.canceled) {
      setModelo({ ...modelo, imagem: result.assets[0].uri });
    }
  };

  const changeInput = (item, field) => {
    setModelo({ ...modelo, [field]: item });
  };

  const inputListItens = [
    {
      placeholder: 'MODELO',
      value: modelo.nome,
      change: (v) => changeInput(v, 'nome'),
    },
    {
      placeholder: 'MOTOR',
      value: modelo.motor,
      change: (v) => changeInput(v, 'motor'),
    },
    {
      placeholder: 'COMBUSTÍVEL',
      value: modelo.tipoCombustivel,
      change: (v) => changeInput(v, 'tipoCombustivel'),
    },
    {
      placeholder: 'ANO',
      value: modelo.anoModelo,
      change: (v) => changeInput(v, 'anoModelo'),
      keyboardType: 'decimal-pad',
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <CustomButton
          title="ESCOLHER IMAGEM DO CARRO"
          style={styles.btn}
          textStyle={styles.txtBtn}
          action={escolherFoto}
        />
        <View style={styles.imgContainer}>
          {modelo.imagem && (
            <Image style={styles.img} source={{ uri: modelo.imagem }} />
          )}
        </View>
        {inputListItens.map((item) => (
          <TextInput
            style={styles.input}
            value={item.value}
            placeholder={item.placeholder}
            onChangeText={item.change}
            keyboardType={item.keyboardType}
          />
        ))}
        <CustomButton
          title="CADASTRAR"
          style={[styles.btn, styles.btnCadastrar]}
          textStyle={styles.txtBtn}
          action={cadastrar}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: 'black',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 20,
  },
  txtBtn: {
    color: 'white',
    textAlign: 'center',
  },
  imgContainer: {
    backgroundColor: 'lightgrey',
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: '100%',
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 5,
    paddingStart: 8,
  },
  btnCadastrar: {
    marginTop: 90,
  },
  img: {
    width: 300,
    height: 150,
  },
});
