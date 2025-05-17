import { useState, useEffect } from 'react';
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
import PhotoInput from '../components/PhotoInput';

export default function AlterarPerfil() {


  //Estados Gerais

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nasc, setNasc] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [senha, setSenha] = useState('');

  //Estados Pacientes

  const [necessidadeAtendimento, setNecessidadeAtendimento] = useState(''); // Corrigido: este é para a necessidade
  const [diagnostico, setDiagnostico] = useState(''); // Corrigido: este é para 'sim'/'nao' (enviado como 'true'/'false')
  const [qualDiagnostico, setQualDiagnostico] = useState('');
  const [encaminhamento, setEncaminhamento] = useState('');
  const [queixas, setQueixas] = useState('');
  const [photoUriPaciente, setPhotoUriPaciente] = useState(null);

  //Estados Profissionais

  const [tipoAtendimento, setTipoAtendimento] = useState('');
  const [trajetoriaProfissional, setTrajetoriaProfissional] = useState('');
  const [photoUriProfissional, setPhotoUriProfissional] = useState(null);

  const router = useRouter();
  const [tipoPerfil, setTipoPerfil] = useState(null); // Estado para armazenar o tipo de perfil
  const [token, setToken] = useState(null); // Estado para armazenar o token
  const [id, setId] = useState(null);



 useEffect(() => {
    async function carregarDadosUsuario() {
      try {
        const storedTipoPerfil = await AsyncStorage.getItem('tipoPerfil');
        const storedToken = await AsyncStorage.getItem('tokenjwt');
        const storedId = await AsyncStorage.getItem('id'); // Certifique-se que a chave é 'idUsuario'

        if (!storedToken || !storedTipoPerfil || !storedId) {
          Alert.alert("Atenção", "Você não está logado, seu perfil não foi definido ou seu ID não foi encontrado!");
          router.replace('/Login');
        } else {
          setTipoPerfil(storedTipoPerfil);
          setToken(storedToken); 
          setId(storedId); 
          // TODO: Carregar dados existentes do perfil para preencher os campos
          // fetchProfileData(storedId, storedToken, storedTipoPerfil); 
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      }
    }

    carregarDadosUsuario();
  }, [router]);


// ...existing code...
  async function handleSalvar() {
    // Validação básica de ID e Token
    if (!id || !token) {
        Alert.alert("Erro", "Informações do usuário não carregadas. Tente novamente.");
        return;
    }

    const formData = new FormData();
    // Campos gerais
    formData.append('name', nome);
    formData.append('cpf', cpf);
    formData.append('email', email);
    formData.append('telefone', telefone);
    // Converta a data de nascimento para o formato ISO se o backend esperar assim
    // Ex: const [dia, mes, ano] = nasc.split('/'); formData.append('dataNascimento', `${ano}-${mes}-${dia}`);
    // Seu backend espera a data no formato ISO, então vamos converter:
    if (nasc) {
        const [dia, mes, ano] = nasc.split('/');
        if (dia && mes && ano && dia.length === 2 && mes.length === 2 && ano.length === 4) {
            const dataNascimentoISO = `${ano}-${mes}-${dia}`;
            formData.append('dataNascimento', dataNascimentoISO);
        } else {
            Alert.alert("Atenção", "Formato da data de nascimento inválido. Use dd/mm/aaaa.");
            return;
        }
    } else {
        formData.append('dataNascimento', ''); // Ou omita se o backend permitir
    }
    formData.append('cidade', cidade);
    formData.append('estado', estado);
    if (senha) { 
      formData.append('password', senha);
    }

    if (tipoPerfil === 'paciente') {


      formData.append('necessidadeAtendimento', necessidadeAtendimento);
      formData.append('diagnostico', diagnostico); 
      if (diagnostico === 'true') {
        formData.append('qualDiagnostico', qualDiagnostico);
      } else {
        formData.append('qualDiagnostico', "");
      }
      formData.append('encaminhamento', encaminhamento);
      formData.append('queixas', queixas);

      if (photoUriPaciente) { 
        const filename = photoUriPaciente.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;
        formData.append('profileimg', {
          uri: photoUriPaciente,
          name: filename,
          type: type,
        });
      }

      try {
        const endpoint = `/usuario-paciente/${id}`; 
        const respApi = await api.put(endpoint, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
          },
        });
        Alert.alert("Sucesso!", respApi.data.message || "Perfil de paciente atualizado com sucesso!");
        router.push('/Menu'); // Redireciona para a página inicial ou outra página desejada
        // Você pode querer recarregar os dados ou navegar
      } catch (error) {
        console.error("DETALHES DO ERRO AO ALTERAR PERFIL DO PACIENTE:", JSON.stringify(error, null, 2));
        if (error.response) {
          console.error("Dados da resposta do erro:", error.response.data);
          console.error("Status da resposta do erro:", error.response.status);
          console.error("Headers da resposta do erro:", error.response.headers);
          Alert.alert("Erro ao alterar perfil", error.response.data?.message || `Erro ${error.response.status}`);
        } else if (error.request) {
          console.error("Requisição feita, mas sem resposta:", error.request);
          Alert.alert("Erro de Rede", "Não foi possível conectar ao servidor. Verifique sua conexão e a URL da API.");
        } else {
          console.error("Erro ao configurar a requisição:", error.message);
          Alert.alert("Erro", `Ocorreu um erro: ${error.message}`);
        }
      }

    } else if (tipoPerfil === 'psicopedagogo') {

      formData.append('tipoAtendimento', tipoAtendimento);
      formData.append('trajetoriaProfissional', trajetoriaProfissional);
      // Adicione outros campos específicos do profissional se houver (ex: CRP)

      if (photoUriProfissional) { // Só adiciona a imagem se uma nova foi selecionada
        const filename = photoUriProfissional.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;
        formData.append('profileimg', {
          uri: photoUriProfissional,
          name: filename,
          type: type,
        });
      }
      
      try {
        const endpoint = `/usuario-profissional/${id}`; // Endpoint correto para profissional
        const respApi = await api.put(endpoint, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Axios deve lidar com isso, mas pode ser explícito
          },
        });
        Alert.alert("Sucesso!", respApi.data.message || "Perfil de profissional atualizado com sucesso!");
        router.push('/Menu');
      } catch (error) {
        console.error("DETALHES DO ERRO AO ALTERAR PERFIL DO PROFISSIONAL:", JSON.stringify(error, null, 2));
        if (error.response) {
          console.error("Dados da resposta do erro:", error.response.data);
          console.error("Status da resposta do erro:", error.response.status);
          console.error("Headers da resposta do erro:", error.response.headers);
          Alert.alert("Erro ao alterar perfil", error.response.data?.message || `Erro ${error.response.status}`);
        } else if (error.request) {
          console.error("Requisição feita, mas sem resposta:", error.request);
          Alert.alert("Erro de Rede", "Não foi possível conectar ao servidor. Verifique sua conexão e a URL da API.");
        } else {
          console.error("Erro ao configurar a requisição:", error.message);
          Alert.alert("Erro", `Ocorreu um erro: ${error.message}`);
        }
      }
    } else {
      Alert.alert("Erro", "Tipo de perfil desconhecido ou não carregado.");
    }
  }

  return (

    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar style="auto" />

      <Header titulo={'Alterar Perfil'} imageSourceProp={true}/>
      <SubHeader conteudo={'Modifique as informações \n do seu perfil abaixo.'}/>

      <View style={EstiloGeral.containerInputsGeral}>

        <Input label={'Nome completo'} placeholder={'Digite seu nome completo'} onChangeText={setNome} />
        <Input label={'CPF'} placeholder={'Digite seu CPF'} onChangeText={setCpf} keyboardType="numeric" />
        <Input label={'E-mail'} placeholder={'Digite seu E-mail'} onChangeText={setEmail} keyboardType="email-address" />
        <Input label={'Telefone / Celular'} placeholder={'Digite seu Telefone / Celular'} onChangeText={setTelefone} keyboardType="numeric" />
        <Input label={'Data de Nascimento'} placeholder={'xx/xx/xxxx'} onChangeText={setNasc} />
        <Input label={'Cidade'} placeholder={'Digite sua Cidade'} onChangeText={setCidade} />
        <Input label={'Estado'} placeholder={'Digite seu Estado'} onChangeText={setEstado} />
        <Input secureTextEntry={true} label={'Senha'} placeholder={'Digite sua Senha'} onChangeText={setSenha} />

      
      {tipoPerfil == 'paciente' ? (
        <>
          <InputRadio
          labelExterna={'Qual a necessidade de atendimento?'}
          options={[
            { label: 'Voluntário', value: 'voluntario' },
            { label: 'Valor Social', value: 'valorsocial' },
          ]}
          checkedValue={necessidadeAtendimento} // Corrigido
          onChange={setNecessidadeAtendimento}   // Corrigido
        />

        <InputRadio
          labelExterna={'Já existe algum diagnóstico?'}
          options={[
            { label: 'Sim', value: 'true' }, // Valor 'true' para Sim
            { label: 'Não', value: 'false' }, // Valor 'false' para Não
          ]}
          checkedValue={diagnostico} // Corrigido
          onChange={setDiagnostico}   // Corrigido
        />

        {diagnostico === 'true' && ( // Verifica se diagnóstico é 'true' para mostrar o campo
          <Input
            label={'Qual?'}
            placeholder={'Digite o diagnóstico se houver'}
            onChangeText={setQualDiagnostico}
            value={qualDiagnostico}
            multiline
            numberOfLines={3}
          />
        )}

        <InputRadio
          labelExterna={'De onde partiu o encaminhamento?'}
          options={[
            { label: 'Escola', value: 'escola' },
            { label: 'Médico', value: 'medico' },
            { label: 'Psicólogo', value: 'psicologo' },
            { label: 'Outro', value: 'outro' },
          ]}
          checkedValue={encaminhamento}
          onChange={setEncaminhamento}
        />

        {/* O Input "Se sim, qual?" duplicado foi removido, pois o condicional acima já o cobre */}

        <Input
          label={'Descreva as principais queixas'}
          placeholder={'Digite aqui'}
          onChangeText={setQueixas}
          value={queixas}
          multiline={true}
          numberOfLines={4} // Ajuste conforme necessário
        />

        {/* <PhotoInput
          label="Foto de Perfil"
          onImageSelected={(uri) => setPhotoUriPaciente(uri)}
          initialImageUri={photoUriPaciente}
        /> */}
        </>
      ):(
        <>
        <InputRadio
          labelExterna={'Qual seu tipo de atendimento?'}
          options={[
              {label: 'Voluntário', value: 'voluntario'},
              {label: 'Valor Social', value: 'valorsocial'},
          ]}
          checkedValue={tipoAtendimento}
          onChange={setTipoAtendimento}
        />

        <Input label={'Descreva sua trajetória profissional'} placeholder={'Digite aqui'} onChangeText={setTrajetoriaProfissional} multiline={true} />

        {/* <PhotoInput
          label="Foto de Perfil"
          onImageSelected={(uri) => setPhotoUriProfissional(uri)}
          initialImageUri={photoUriProfissional}
        /> */}
        </>
      )}
      
      <Botao texto={'Salvar'} onPress={handleSalvar} corFundo='#1696de' corTexto='white' marginTop={20}/>

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