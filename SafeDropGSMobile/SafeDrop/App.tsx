import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inicial from './pages/Inicial';
import Cadastro from './pages/Cadastro';
import Entrar from './pages/Entrar';
import Ocorrencias from './pages/Ocorrencias';
import CustomHeader from './pages/components/ConteudoHeader';
import Abrigos from './pages/Abrigos';
import Mapa from './pages/Mapa';
import Home from './pages/Home'
import ConteudoDrawer from './pages/components/ConteudoDrawer'
import Alertas from './pages/Alertas';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator drawerContent={(props) => <ConteudoDrawer {...props} />}>
      <Drawer.Screen name="Home" component={Home} options={{
      header: () => <CustomHeader />
    }}/>
      <Drawer.Screen name="Ocorrencia" component={Ocorrencias} options={{
      header: () => <CustomHeader />
    }}/>
    <Drawer.Screen name="Abrigos" component={Abrigos} options={{
      header: () => <CustomHeader />
    }}/>
    <Drawer.Screen name="Mapa" component={Mapa} options={{
      header: () => <CustomHeader />
    }}/>
    <Drawer.Screen name="Alerta" component={Alertas} options={{
      header: () => <CustomHeader />
    }}/>
    </Drawer.Navigator>
  );
}


export default function App() {
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">  
        <Stack.Screen name="Inicial" component={Inicial} options={{ headerShown: false }}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerTransparent: true, headerTitle: '', headerTintColor: "#fff" }}/>
        <Stack.Screen name="Entrar" component={Entrar} options={{ headerTransparent: true, headerTitle: '', headerTintColor: "#fff" }}/>
        <Stack.Screen name="Menu" component={DrawerRoutes} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
