import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import EstiloGeral from './EstiloGeral';
import Botao from '../components/Botao';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Input from '../components/Input';

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    if (email === '' || senha === '') {

      Alert.alert("Atenção", "Preencha todos os campos!");

    } else {

      Alert.alert("Tudo OK!", "Login configurado, agora é integrar com o backend.");
      
    }
  }

  return (

    <View style={EstiloGeral.body}>

      <StatusBar style="auto" />
      
      <Header titulo={'Login'}/>
      <SubHeader conteudo={'Preencha as informações para fazer login'}/>

      <View style={EstiloGeral.containerInputsGeral}>

        <Input label={'E-mail'} placeholder={'Digite seu e-mail'} onChangeText={(e) => setEmail(e)}/>
        <Input label={'Senha'} placeholder={'Digite sua senha'} onChangeText={(e) => setSenha(e)}/>

        <Botao marginTop={20} texto={'Entrar'} corFundo='#1696de' corTexto='white' onPress={() => {handleLogin()}}/>

        <Text style={EstiloGeral.h2}>Não tem cadastro?</Text>

        <Botao texto={'Cadastre-se'} onPress={() => {router.push('/Cadastro')}}/>

      </View>


    </View>

  );
}