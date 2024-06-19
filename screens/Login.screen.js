import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useState } from 'react';
import { login } from '../connection';

export default function LoginScreen({ setUser, appIsReady }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const logar = async () => {
    const error = { email: '', password: '' };
    const emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const result = emailregex.test(email);
    if (result && password) {
      const user = await login(email, password);
      setUser(user);
    }
    if (!result) error.email = 'ERROR';

    if (!password) error.password = 'ERROR';

    setError(error);
  };

  return appIsReady ? (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/logo_appfusion.jpg')}
          style={styles.logo}
        />
      </View>
      <View>
        <View>
          <Text style={styles.label}>
            {error.email && 'Preencha o campo de email!'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View>
          <Text style={styles.label}>
            {error.password && 'Preencha o campo de senha!'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={logar}>
          <Text style={styles.textBtn}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.containerLoading}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/originals/1c/28/43/1c284399a50505ca9cb7642a71645bd1.gif',
        }}
        style={styles.imgLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 80,
    height: '100%',
  },
  input: {
    borderWidth: 1,
    marginBottom: 30,
    paddingStart: 10,
    fontSize: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#dedede88',
  },
  label: {
    textTransform: 'uppercase',
    color: 'red',
    fontWeight: 600,
  },
  btn: {
    alignSelf: 'center',
    marginTop: 70,
    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  textBtn: {
    color: 'white',
    fontWeight: 600,
    fontSize: 20,
  },
  logo: {
    alignSelf: 'center',
    // marginBottom: 30
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLoading: {
    width: 250,
    height: 250,
  },
});
