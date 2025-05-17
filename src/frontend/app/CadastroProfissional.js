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

export default function CadastroProfissional() {

  const router = useRouter();

  const [necessaidadeAtendimento, setNecessidadeAtendimento] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [qualDiagnostico, setQualDiagnostico] = useState('');
  const [encaminhamento, setEncaminhamento] = useState('');
  const [queixas, setQueixas] = useState('');

  async function handleCadastrar() {

 
  }

  return (

    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      
      <StatusBar style="auto" />


      <Header titulo={'Cadastro Profissional'}/>
      <SubHeader conteudo={'Precisamos de mais informações sobre o profissional para melhor atendimento!'}/>


      <View style={EstiloGeral.containerInputsGeral}>

        <InputRadio
          labelExterna={'Qual a necessidade de atendimento?'}
          options={[
              {label: 'Voluntário', value: 'voluntario'},
              {label: 'Valor Social', value: 'valorsocial'},
          ]}
          checkedValue={diagnostico}
          onChange={setDiagnostico}
        />

        <InputRadio
          labelExterna={'Já existe algum diagnóstico'}
          options={[
              {label: 'Sim', value: 'true'},
              {label: 'Não', value: 'false'},
          ]}
          checkedValue={necessaidadeAtendimento}
          onChange={setNecessidadeAtendimento}
        />

        <Input label={'Se sim, qual?'} placeholder={'Digite o diagnóstico se houver'} onChangeText={setQualDiagnostico} />

          <InputRadio
          labelExterna={'De onde partiu o encaminhamento?'}
          options={[
              {label: 'Escola', value: 'escola'},
              {label: 'Médico', value: 'medico'},
              {label: 'Psicólogo', value: 'psicologo'},
          ]}
          checkedValue={encaminhamento}
          onChange={setEncaminhamento}
        />

        <Input label={'Se sim, qual?'} placeholder={'Digite o diagnóstico se houver'} onChangeText={setQualDiagnostico} />

        <Input label={'Descreva as principais queixas'} placeholder={'Digite aqui'} onChangeText={setQueixas} multiline={true} />

        <Botao texto={'Avançar'} onPress={handleCadastrar} corFundo='#1696de' corTexto='white' marginTop={20}/>



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
    // paddingBottom: 40,
    flexGrow: 1, 
  }
});