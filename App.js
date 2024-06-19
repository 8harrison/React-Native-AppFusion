import Context from './context/ContextValue';
import Modelos from './screens/Modelos.screen';
import CadastrarScreen from './screens/Cadastrar.screen';
import DashBoardScreen from './screens/DashBoardScreen';
import LoginScreen from './screens/Login.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useState, useEffect } from 'react';
import { isLogged } from './connection';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() { 

  const [user, setUser] = useState();
  const [appIsReady, setAppIsReady] = useState(false);
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }
  changeScreenOrientation();

  const verificaLogado = () => {
    isLogged(setUser);
    if (user || user === null) {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    verificaLogado();
  });

  return (
    <Context>
      <View style={{ height: '100%' }}>
        {user ? (
          <NavigationContainer>
            <Tab.Navigator

              screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: { fontWeight: 690, fontSize: 40, fontFamily: 'Inter_900Black' },
                headerStyle: { backgroundColor: 'white' },
                tabBarStyle: {
                  backgroundColor: 'black',
                  height: 60,
                  paddingTop: 10,
                },
                tabBarLabelStyle: { color: 'white', fontSize: 16 },
                 
              }}>
              <Tab.Screen
                name="MODELOS"
                component={Modelos}
                options={{
                  tabBarLabel: 'MODELOS',
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome6 name="car" size={24} color="white" />
                  ),
                }}
              />
              <Tab.Screen
                name="CADASTRO"
                component={CadastrarScreen}
                options={{
                  tabBarLabel: 'CADASTRAR',
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="plus-square-o" size={26} color="white" />
                  ),
                }}
              />
              <Tab.Screen
                name="INDICADORES"
                component={DashBoardScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Entypo name="line-graph" size={24} color="white" />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <LoginScreen
            setUser={setUser}
            appIsReady={appIsReady}
            setAppIsReady={setAppIsReady}
          />
        )}
      </View>
    </Context>
  );
}
