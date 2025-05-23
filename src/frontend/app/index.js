import { StatusBar } from 'expo-status-bar';
import {Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import EstiloGeral from './EstiloGeral';
import Botao from '../components/Botao';

import {useFonts, PlaypenSans_400Regular, PlaypenSans_700Bold} from '@expo-google-fonts/playpen-sans'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlaypenSans_400Regular,
    PlaypenSans_700Bold
  })

if (!fontsLoaded) {
    return null;
  }

  return (

    <View style={EstiloGeral.body}>

      <StatusBar style="auto" />

      <View style={EstiloGeral.homeCenter}>

        <Image source={require('../assets/imgs/logo.png')} style={EstiloGeral.logo}/>

        <View style={EstiloGeral.faixaVerdeHome}>

          <Image source={require('../assets/imgs/icone-home.png')}/>
          <Text style={EstiloGeral.h1}>Ofereça serviços ou encontre psicopedagogos sociais!</Text>
          
        </View>

        <View style={EstiloGeral.areaBotoesHome}>

          <Botao texto="Login" onPress={() => router.push('/Login')}/>
          <Text style={EstiloGeral.h2}>Ainda não tem cadastro?</Text>
          <Botao texto="Cadastrar" onPress={() => router.push('/Cadastro')}/>

          {/* <Botao texto="Menu" onPress={() => router.push('/Listar')}/>
          <Botao texto="Limpar BD local" onPress={async () => await AsyncStorage.clear()} marginTop={50} corFundo='#1696de' corTexto='white'/> */}

        </View>

      </View>
      
    </View>

  );
}
