import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet, Alert as ReactNativeAlert } from 'react-native';
import { useRouter } from 'expo-router';
import EstiloGeral from './EstiloGeral';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import InputRadio from '../components/InputRadio';
import Botao from '../components/Botao';
import Input from '../components/Input';
import api from '../services/api'; // Importando a instância do Axios
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhotoInput from '../components/PhotoInput'; // Importando o componente de imagem

export default function CadastroPaciente() {
  const router = useRouter();

  // Estados do formulário
  const [necessidadeAtendimento, setNecessidadeAtendimento] = useState(''); // Corrigido: este é para a necessidade
  const [diagnostico, setDiagnostico] = useState(''); // Corrigido: este é para 'sim'/'nao' (enviado como 'true'/'false')
  const [qualDiagnostico, setQualDiagnostico] = useState('');
  const [encaminhamento, setEncaminhamento] = useState('');
  const [queixas, setQueixas] = useState('');
  const [photoUri, setPhotoUri] = useState(null); // Estado para o URI da imagem
  const [idUsuario, setIdUsuario] = useState(null); // Estado para o ID do usuário

  // Buscar ID do usuário ao carregar o componente
  useEffect(() => {
    const fetchIdUsuario = async () => {
      try {
        const storedId = await AsyncStorage.getItem('idUsuario');
        if (storedId) {
          setIdUsuario(storedId);
        } else {
          ReactNativeAlert.alert("Erro", "ID do usuário não encontrado. Por favor, faça login novamente.");
          router.replace('/Login'); // Redireciona se não houver ID
        }
      } catch (error) {
        console.error("Erro ao buscar ID do usuário:", error);
        ReactNativeAlert.alert("Erro", "Não foi possível buscar os dados do usuário.");
      }
    };
    fetchIdUsuario();
  }, [router]);

  async function handleCadastrar() {
    if (!idUsuario) {
      ReactNativeAlert.alert("Atenção", "Não foi possível identificar o usuário. Tente novamente.");
      return;
    }
    if (!necessidadeAtendimento || !diagnostico || (diagnostico === 'true' && !qualDiagnostico) || !encaminhamento || !queixas) {
      ReactNativeAlert.alert("Atenção", "Preencha todos os campos obrigatórios!");
      return;
    }
    if (!photoUri) {
      ReactNativeAlert.alert("Atenção", "Por favor, selecione uma imagem de perfil.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('usuarioId', idUsuario);
      formData.append('necessidadeAtendimento', necessidadeAtendimento);
      formData.append('diagnostico', diagnostico); // Backend espera 'true' ou 'false' como string
      if (diagnostico === 'true') {
        formData.append('qualDiagnostico', qualDiagnostico);
      } else {
        formData.append('qualDiagnostico', ""); // Enviar vazio se não houver diagnóstico
      }
      formData.append('encaminhamento', encaminhamento);
      formData.append('queixas', queixas);

      const filename = photoUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`; // Define um tipo MIME padrão
      formData.append('profileimg', {
        uri: photoUri,
        name: filename,
        type: type,
      });

      // Usar Axios para enviar FormData
      const response = await api.post('/cadastro-paciente', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Se sua rota '/cadastro-paciente' for privada e exigir autenticação:
          // const token = await AsyncStorage.getItem('tokenjwt');
          // if (token) {
          //   config.headers.Authorization = `Bearer ${token}`;
          // }
        },
      });

      // Com Axios, os dados da resposta bem-sucedida geralmente estão em response.data
      ReactNativeAlert.alert("Sucesso!", response.data.message || "Cadastro de paciente realizado com sucesso.");
      router.push('/Login'); // Ou para uma tela de dashboard/home

    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      let errorMessage = "Não foi possível concluir o cadastro. Tente novamente.";
      if (error.response) {
        // Erro vindo do backend (status code fora do range 2xx)
        errorMessage = error.response.data.message || error.response.data.error || `Erro: ${error.response.status}`;
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
      } else {
        // Algo aconteceu ao configurar a requisição
        errorMessage = error.message;
      }
      ReactNativeAlert.alert("Erro ao Cadastrar", errorMessage);
    }
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar style="auto" />
      <Header titulo={'Cadastro Paciente'} />
      <SubHeader conteudo={'Precisamos de mais informações sobre o paciente para melhor atendimento!'} />

      <View style={EstiloGeral.containerInputsGeral}>
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

        <PhotoInput
          label="Foto de Perfil"
          onImageSelected={(uri) => setPhotoUri(uri)}
          initialImageUri={photoUri}
        />

        <Botao texto={'Concluir Cadastro'} onPress={handleCadastrar} corFundo='#1696de' corTexto='white' marginTop={20} />
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
    paddingBottom: 40, // Espaço para o botão no final
    flexGrow: 1,
  }
});