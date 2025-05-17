import { useState, useEffect, use } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import EstiloGeral from './EstiloGeral';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import InputRadio from '../components/InputRadio';
import Botao from '../components/Botao';
import Input from '../components/Input';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Listar() {

    const [tipoPerfil, setTipoPerfil] = useState('');   

    useEffect(() => {
      const tipoPerfil = async () => {
        const perfil = await AsyncStorage.getItem('tipoPerfil');
        setTipoPerfil(perfil);
      };
      tipoPerfil();
    }, []);

  const titulo = tipoPerfil == 'psicopedagogo' ? 'Pacientes' : 'Psicopedagogos';
  const router = useRouter();

  return (

    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >

    <StatusBar style="auto" />


    <Header titulo={titulo}/>
    <SubHeader conteudo={`Conheça novos ${titulo}\npara atendimento.`}/>

    <View style={{height: 50}}></View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, 
    backgroundColor: '#fffaf5', 
  },
  contentContainer: {
    alignItems: 'center',
    // paddingBottom: 40,
    flexGrow: 1, 
  }
});