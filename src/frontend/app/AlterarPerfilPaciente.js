import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import EstiloGeral from './EstiloGeral';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import InputRadio from '../components/InputRadio';
import Botao from '../components/Botao';
import Input from '../components/Input';
import InputArea from '../components/InputArea';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '../components/Alert';

export default function AlterarPerfilPaciente() {
    const router = useRouter();
    const [necessidadeAtendimento, setNecessidadeAtendimento] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nasc, setNasc] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [senha, setSenha] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [queixas, setQueixas] = useState('');
    const [encaminhamento, setEncaminhamento] = useState('');
    const [qualDiagnostico, setQualDiagnostico] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const carregarDadosUsuario = async () => {
        try {

            const token = await AsyncStorage.getItem('tokenjwt');
            const email = await AsyncStorage.getItem('email');

            if (!token || !email) {
                Alert.alert('Erro', 'Você precisa estar logado para acessar esta funcionalidade');
                router.push('/Login');
                return;
            }

            setEmail(email);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await api.get(`/list-pacientes`);
            console.log('Dados do usuário:', response.data);

            const usuarioAtual = response.data.find(user => user.email === email);
            console.log('Usuário atual:', usuarioAtual);

            if (!usuarioAtual) {
                Alert.alert('Erro', 'Usuário não encontrado');
                return;
            }

            setIdUsuario(usuarioAtual.id || '');
            setCidade(usuarioAtual.cidade || '');
            setEstado(usuarioAtual.estado || '');
            setCpf(usuarioAtual.cpf || '');
            setEmail(usuarioAtual.email || '');

            setNome(usuarioAtual.name || '');
            setTelefone(usuarioAtual.telefone || '');


            const dataNascimento = usuarioAtual.dataNascimento;
            if (dataNascimento) {
                const data = new Date(dataNascimento);
                const dia = String(data.getDate()).padStart(2, '0');
                const mes = String(data.getMonth() + 1).padStart(2, '0');
                const ano = data.getFullYear();
                setNasc(`${dia}/${mes}/${ano}`);
            }

            setNecessidadeAtendimento(usuarioAtual.paciente.necessidadeAtendimento || '');
            setDiagnostico(usuarioAtual.paciente.diagnostico ? 'sim' : 'nao');
            setQualDiagnostico(usuarioAtual.paciente.qualDiagnostico || '');
            setEncaminhamento(usuarioAtual.paciente.encaminhamento || '');
            setQueixas(usuarioAtual.paciente.queixas || '');
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
        }
    };

    useEffect(() => {
        carregarDadosUsuario();
    }, []);

    const prepararFormData = () => {
        const formData = new FormData();

        formData.append('name', nome);
        formData.append('telefone', telefone);

        if (nasc) {
            const [dia, mes, ano] = nasc.split('/');
            const dataNascimentoISO = `${ano}-${mes}-${dia}`; // Reorganiza no formato ISO
            console.log('Data de nascimento ISO:', new Date(dataNascimentoISO).toISOString());
            formData.append('dataNascimento', new Date(dataNascimentoISO).toISOString());
        }

        formData.append('cidade', cidade);
        formData.append('estado', estado);

        if (senha) {
            formData.append('password', senha);
        }

        formData.append('necessidadeAtendimento', necessidadeAtendimento);
        formData.append('diagnostico', diagnostico === 'sim' ? 'true' : 'false');
        formData.append('qualDiagnostico', qualDiagnostico);
        formData.append('encaminhamento', encaminhamento);
        formData.append('queixas', queixas);
        formData.append('email', email);
        formData.append('cpf', cpf);

        return formData;
    };

    const salvarAlteracoes = async () => {
        try {
            console.log('Salvando alterações...');
            setIsLoading(true);

            if (!nome || !telefone || !cidade || !estado || !necessidadeAtendimento || !diagnostico || !encaminhamento || !queixas) {
                console.log('Campos obrigatórios não preenchidos');
                Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
                setIsLoading(false);
                return;
            }

            console.log('Campos obrigatórios preenchidos com sucesso!');

            if (nasc && !/^\d{2}\/\d{2}\/\d{4}$/.test(nasc)) {
                Alert.alert('Erro', 'A data de nascimento deve estar no formato DD/MM/AAAA');
                setIsLoading(false);
                return;
            }

            const token = await AsyncStorage.getItem('tokenjwt');

            if (!token) {
                Alert.alert('Erro', 'Você precisa estar logado para salvar alterações');
                router.push('/Login');
                setIsLoading(false);
                return;
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            api.defaults.headers.common['Content-Type'] = 'multipart/form-data';

            const formData = prepararFormData();
            console.log('Dados do formulário:', formData);

            const response = await api.put(`/usuario-paciente/${idUsuario}`, formData);

            if (response.status === 200) {
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso', [
                    { text: 'OK', onPress: () => router.push('/Listar') }
                ]);
            }
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            let mensagem = 'Não foi possível salvar as alterações';

            if (error.response) {
                mensagem += `. O servidor retornou: ${error.response.data.message || error.response.status}`;
            }

            Alert.alert('Erro', mensagem);
        } finally {
            setIsLoading(false);
        }
    };

    const excluirPerfil = async () => {
        try {
            Alert.alert(
                'Confirmação',
                'Tem certeza que deseja excluir seu perfil? Esta ação não pode ser desfeita.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Sim, excluir',
                        style: 'destructive',
                        onPress: async () => {
                            setIsLoading(true);

                            const token = await AsyncStorage.getItem('tokenjwt');

                            if (!token) {
                                Alert.alert('Erro', 'Você precisa estar logado para excluir seu perfil');
                                router.push('/Login');
                                setIsLoading(false);
                                return;
                            }

                            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                            const response = await api.delete(`/usuario-delete/${idUsuario}`);

                            if (response.status === 200) {

                                await AsyncStorage.removeItem('tokenjwt');
                                await AsyncStorage.removeItem('idUsuario');

                                Alert.alert('Sucesso', 'Perfil excluído com sucesso', [
                                    { text: 'OK', onPress: () => router.push('/Login') }
                                ]);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Erro ao excluir perfil:', error);
            let mensagem = 'Não foi possível excluir o perfil';

            if (error.response) {
                mensagem += `. O servidor retornou: ${error.response.data.message || error.response.status}`;
            }

            Alert.alert('Erro', mensagem);
            setIsLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
        >

            <StatusBar style="auto" />

            <Header titulo={'Alterar Perfil'} />
            <SubHeader conteudo={'Altere os dados do seu perfil de acordo com a sua necessidade.'} />

            <View style={EstiloGeral.containerInputsGeral}>
                <Input label={'Nome completo'} placeholder={'Digite seu nome completo'} defaultValue={nome} onChangeText={setNome}/>
                <Input label={'Telefone / Celular'} placeholder={'Digite seu Telefone / Celular'} defaultValue={telefone} onChangeText={setTelefone}
                    keyboardType="numeric"/>
                <Input label={'Data de Nascimento'} placeholder={'xx/xx/xxxx'} defaultValue={nasc} onChangeText={setNasc}/>
                <Input label={'Cidade'} placeholder={'Digite sua Cidade'} defaultValue={cidade} onChangeText={setCidade}/>
                <Input label={'Estado'} placeholder={'Digite seu Estado'} defaultValue={estado} onChangeText={setEstado}/>

                <InputRadio
                    labelExterna={'Qual a necessidade do atendimento ?'}
                    options={[
                        { label: 'Voluntário', value: 'voluntario' },
                        { label: 'Valor Social', value: 'valor social' },
                    ]}
                    checkedValue={necessidadeAtendimento}
                    onChange={setNecessidadeAtendimento}
                />
                <InputRadio
                    labelExterna={'Já existe algum diagnóstico ?'}
                    options={[
                        { label: 'Sim', value: 'sim' },
                        { label: 'Não', value: 'nao' },
                    ]}
                    checkedValue={diagnostico}
                    onChange={setDiagnostico}
                />
                <InputArea
                    label={'Se sim, qual'}
                    placeholder={''}
                    defaultValue={qualDiagnostico}
                    onChangeText={setQualDiagnostico}
                />
                <InputRadio
                    labelExterna={'De onde partiu o encaminhamento ?'}
                    options={[
                        { label: 'Escola', value: 'escola' },
                        { label: 'Médico', value: 'medico' },
                        { label: 'Psicólogo', value: 'psicologo' },
                    ]}
                    checkedValue={encaminhamento}
                    onChange={setEncaminhamento}
                />
                <InputArea label={'Descreva as principais queixas'} placeholder={''} defaultValue={queixas} onChangeText={setQueixas}/>

                <Botao
                    texto={isLoading ? 'Salvando...' : 'Salvar'}
                    onPress={salvarAlteracoes}
                    corFundo="#6ab54d"
                    corTexto="white"
                    marginTop={20}
                    disabled={isLoading}
                />

                <Botao
                    texto={'Excluir Perfil'}
                    onPress={excluirPerfil}
                    corFundo="#ff4040"
                    corTexto="white"
                    marginTop={10}
                    disabled={isLoading}
                />
            </View>
        </ScrollView>
    );
};

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