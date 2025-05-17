import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import EstiloGeral from './EstiloGeral';
import Botao from '../components/Botao';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Input from '../components/Input';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu() {

  const router = useRouter();
  const [tipoPerfil, setTipoPerfil] = useState(null); // Estado para armazenar o tipo de perfil
  const [token, setToken] = useState(null); // Estado para armazenar o token

  useEffect(() => {
    async function carregarDadosUsuario() {
      try {
        const storedTipoPerfil = await AsyncStorage.getItem('tipoPerfil');
        const storedToken = await AsyncStorage.getItem('tokenjwt');

        if (!storedToken || !storedTipoPerfil) {
          Alert.alert("Atenção", "Você não está logado ou seu perfil não foi definido!");
          router.replace('/Login'); // Usar replace para não adicionar ao histórico de navegação
        } else {
          setTipoPerfil(storedTipoPerfil); // Atualiza o estado
          setToken(storedToken); // Atualiza o estado
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
        // Considere redirecionar ou mostrar uma mensagem de erro mais persistente
      }
    }

    carregarDadosUsuario();
  }, [router]);

  const condicaoBtn = tipoPerfil === 'psicopedagogo' ? 'Pacientes' : 'Psicopedagogos';

  return (

    <View style={EstiloGeral.body}>

      <StatusBar style="auto" />
      
      <Header titulo={'Menu de navegação'}/>
      <SubHeader conteudo={'Navegue pelas telas da aplicação'}/>

      <View style={EstiloGeral.containerInputsGeral}>

        <Botao texto={'Tela Inicial'} onPress={() => {router.push('/')}} corTexto='white' corFundo='#1696de' marginTop={15}/>
        <Botao texto={`${condicaoBtn}`} onPress={() => {router.push('/Listar')}} corTexto='white' corFundo='#1696de' marginTop={15}/>
        <Botao texto={'Alterar Perfil'} onPress={() => {router.push('/AlterarPerfil')}} corTexto='white' corFundo='#1696de' marginTop={15}/>
        <Botao texto={'Alterar Perfil Paciente'} onPress={() => {router.push('/AlterarPerfilPaciente')}} corTexto='white' corFundo='#1696de' marginTop={15}/>
        <Botao texto={'Alterar Perfil Profissional'} onPress={() => {router.push('/AlterarPerfilProfissional')}} corTexto='white' corFundo='#1696de' marginTop={15}/>
        <Botao texto={'Cadastrar'} onPress={() => {router.push('/Cadastro')}} corTexto='white' corFundo='#1696de' marginTop={15}/>
        <Botao texto={'Login'} onPress={() => {router.push('/Login')}} corTexto='white' corFundo='#1696de' marginTop={15}/>

        <Botao texto={'Limpar BD Local'} onPress={async () => {await AsyncStorage.clear(); Alert.alert("Atenção", "Banco de dados local excluído.")}} corTexto='white' corFundo='red' marginTop={15}/>


      </View>


    </View>

  );
}