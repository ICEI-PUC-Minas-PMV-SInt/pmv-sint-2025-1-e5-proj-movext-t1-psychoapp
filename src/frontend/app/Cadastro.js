import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import EstiloGeral from './EstiloGeral';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import InputRadio from '../components/InputRadio';
import Botao from '../components/Botao';
import Input from '../components/Input';

export default function Cadastro() {

  const router = useRouter();

  const [tipoPerfil, setTipoPerfil] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nasc, setNasc] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [senha, setSenha] = useState('');

  function handleCadastrar() {

    if (tipoPerfil === '' || nome === '' || cpf === '' || email === '' || telefone === '' || nasc === '' || cidade === '' || estado === '' || senha === '') {

      Alert.alert("Atenção", "Preencha todos os campos!");

    } else{

       Alert.alert("Tudo OK!", "Cadastro configurado, agora é integrar com o backend.");

    }



  }

  return (

    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar style="auto" />


      <Header titulo={'Cadastro'}/>
      <SubHeader conteudo={'Preencha as informações abaixo para cadastrar seu novo perfil.'}/>


      <View style={EstiloGeral.containerInputsGeral}>

        <InputRadio
          labelExterna={'Tipo de perfil'}
          options={[
              {label: 'Paciente', value: 'paciente'},
              {label: 'Psicopedagogo', value: 'psicopedagogo'},
          ]}
          checkedValue={tipoPerfil}
          onChange={setTipoPerfil}
        />


        <Input label={'Nome completo'} placeholder={'Digite seu nome completo'} onChangeText={setNome} />
        <Input label={'CPF'} placeholder={'Digite seu CPF'} onChangeText={setCpf} keyboardType="numeric" />
        <Input label={'E-mail'} placeholder={'Digite seu E-mail'} onChangeText={setEmail} keyboardType="email-address" />
        <Input label={'Telefone / Celular'} placeholder={'Digite seu Telefone / Celular'} onChangeText={setTelefone} keyboardType="numeric" />
        <Input label={'Data de Nascimento'} placeholder={'xx/xx/xxxx'} onChangeText={setNasc} />
        <Input label={'Cidade'} placeholder={'Digite sua Cidade'} onChangeText={setCidade} />
        <Input label={'Estado'} placeholder={'Digite seu Estado'} onChangeText={setEstado} />
        <Input label={'Senha'} placeholder={'Digite sua Senha'} onChangeText={setSenha} />



        <Botao texto={'Avançar'} onPress={handleCadastrar} corFundo='#1696de' corTexto='white' marginTop={20}/>

        <Text style={EstiloGeral.h2}>Já tem cadastro? Faça:</Text>

        <Botao texto={'Login'} onPress={() => router.push('/Login')}/>

      </View>
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
    paddingBottom: 40,
    flexGrow: 1, 
  }
});