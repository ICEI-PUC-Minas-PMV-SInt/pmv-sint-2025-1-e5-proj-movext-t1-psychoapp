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
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  async function handleCadastrar() {

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(nasc)) {
      Alert.alert("Atenção", "Data de nascimento inválida. Use o formato dd/mm/aaaa.");
      return;
    }

    if (
      tipoPerfil === '' || 
      nome === '' || 
      cpf === '' || 
      email === '' || 
      telefone === '' || 
      nasc === '' || 
      cidade === '' || 
      estado === '' || 
      senha === ''
    ) {
      Alert.alert("Atenção", "Preencha todos os campos!");
    } else {
      try {
        // Converte a data de nascimento para o formato ISO (aaaa-mm-dd)
        const [dia, mes, ano] = nasc.split('/'); // Divide a string em partes
        const dataNascimentoISO = `${ano}-${mes}-${dia}`; // Reorganiza no formato ISO
  
        const resApi = await api.post('/cadastro', {
          tipoPerfil: tipoPerfil,
          name: nome,
          cpf: cpf,
          email: email,
          telefone: telefone,
          dataNascimento: dataNascimentoISO, // Envia a data no formato correto
          cidade: cidade,
          estado: estado,
          password: senha,
        });
  
        const idUsuario = resApi.data.id;
  
        await AsyncStorage.setItem('idUsuario', idUsuario);
  
<<<<<<< HEAD
        Alert.alert("Sucesso!", "Cadastro realizado com sucesso! Por favor faça login para continuar.");
        {tipoPerfil == "paciente" ? router.push('CadastroEspecializacaoUsuarioPaciente') : router.push('CadastroEspecializacaoUsuarioProfissional')}
       
=======
        Alert.alert("1ª Etapa concluída!", `Por favor conclua seu perfil como ${tipoPerfil}.`);
  
        router.push(tipoPerfil == 'paciente' ? '/CadastroPaciente' : '/CadastroProfissional');


>>>>>>> temp-branch
      } catch (e) {
        if (e.response) {
          Alert.alert(
            "Erro ao cadastrar",
            `Status: ${e.response.status}\nMensagem: ${e.response.data.message}`
          );
          console.error("Erro detalhado:", e.response.data);
        } else if (e.request) {
          Alert.alert("Erro ao cadastrar", "Nenhuma resposta do servidor.");
          console.error("Erro na requisição:", e.request);
        } else {
          Alert.alert("Erro ao cadastrar", "Erro ao configurar a requisição.");
          console.error("Erro desconhecido:", e.message);
        }
      }
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
        <Input secureTextEntry={true} label={'Senha'} placeholder={'Digite sua Senha'} onChangeText={setSenha} />



        <Botao texto={'Avançar'} onPress={handleCadastrar} corFundo='#1696de' corTexto='white' marginTop={20}/>

        <Text style={EstiloGeral.h2}>Já tem cadastro? Faça:</Text>

        <Botao texto={'Login'} onPress={() => router.push('/Login')}/>

        {/* ÁREA DE TESTES: */}

        {/* <View style={EstiloGeral.areaTeste}>

          <Text style={{color:'white', fontFamily:'PlaypenSans_700Bold', fontSize: 16}}>ÁREA DE TESTES DO BD LOCAL:</Text>

          <Botao texto={'ID APÓS CADASTRO'} onPress={() => {

            AsyncStorage.getItem('idUsuario').then((value) => {
              Alert.alert("ID do Usuário", value);
            });
          }} corFundo='#1696de' corTexto='white' marginTop={20}/>


          <Botao texto={'TOKEN APÓS LOGIN'} onPress={() => {
            AsyncStorage.getItem('tokenjwt').then((value) => {
              Alert.alert("Token JWT", value);
            });
          }} corFundo='#1696de' corTexto='white' marginTop={20}/>


          <Botao texto={'TIPO PERFIL'} onPress={() => {
            AsyncStorage.getItem('tipoPerfil').then((value) => {
              Alert.alert("Tipo de Perfil:", value);
            });
          }} corFundo='#1696de' corTexto='white' marginTop={20}/>

        </View> */}

       {/* ÁREA DE TESTES: */}

      </View>

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