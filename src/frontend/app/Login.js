import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Link} from 'expo-router';
import EstiloGeral from './EstiloGeral';
import Botao from '../components/Botao';
import Header from '../components/Header';

import {useFonts, PlaypenSans_400Regular, PlaypenSans_700Bold} from '@expo-google-fonts/playpen-sans'


export default function App() {

  return (

    <View style={EstiloGeral.body}>

      <StatusBar style="auto" />

      <Header titulo={'Login'}/>

    </View>

  );
}