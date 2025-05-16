import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import EstiloGeral from './EstiloGeral';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import InputRadio from '../components/InputRadio';
import Botao from '../components/Botao';
import Input from '../components/Input';
import InputArea from '../components/InputArea';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '../components/Alert';

export default function AlterarPerfilProfissional() {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nasc, setNasc] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoAtendimento, setTipoAtendimento] = useState('');
    const [trajetoriaProfissional, setTrajetoriaProfissional] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [idUsuario, setIdUsuario] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    // Função para carregar os dados do usuário ao abrir a tela
    const carregarDadosUsuario = async () => {
        try {
            // Recuperar o token JWT e o ID do usuário do AsyncStorage
            const token = await AsyncStorage.getItem('tokenjwt');
            const userId = await AsyncStorage.getItem('idUsuario');

            if (!token || !userId) {
                Alert.alert('Erro', 'Você precisa estar logado para acessar esta funcionalidade');
                router.push('/Login');
                return;
            }

            setIdUsuario(userId);

            // Configurar o cabeçalho da requisição com o token
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Buscar os dados do usuário
            const response = await api.get(`/list-pacientes`);
            console.log('Dados do usuário:', response.data);

            // Encontrar o usuário atual na lista de pacientes
            const usuarioAtual = response.data.find(user => user.id === userId);
            console.log('Usuário atual:', usuarioAtual);

            if (!usuarioAtual) {
                Alert.alert('Erro', 'Usuário não encontrado');
                return;
            }

            // Preencher os campos do formulário com os dados existentes
            setNome(usuarioAtual.name || '');
            setTelefone(usuarioAtual.telefone || '');

            // Formatar a data de nascimento para o formato DD/MM/AAAA
            if (usuarioAtual.dataNascimento) {
                const data = new Date(usuarioAtual.dataNascimento);
                const dia = String(data.getDate()).padStart(2, '0');
                const mes = String(data.getMonth() + 1).padStart(2, '0');
                const ano = data.getFullYear();
                setNasc(`${dia}/${mes}/${ano}`);
            }

            setCidade(usuarioAtual.cidade || '');
            setEstado(usuarioAtual.estado || '');
            setCpf(usuarioAtual.cpf || '');
            setEmail(usuarioAtual.email || '');

            if (usuarioAtual.paciente) {
                setTipoAtendimento(usuarioAtual.profissional.tipoAtendimento || '');
                setTrajetoriaProfissional(usuarioAtual.profissional.trajetoriaProfissional || '');
                setProfileImg(usuarioAtual.paciente.profileimg || null);

                // Se houver imagem de perfil, exibir a imagem
                if (usuarioAtual.paciente.profileimg) {
                    setProfileImage(`https://drive.google.com/file/d/${usuarioAtual.profissional.profileimg}`);
                }
            }

        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
        }
    };

    useEffect(() => {
        carregarDadosUsuario();
    }, []);

    // Função para selecionar imagem da galeria
    const selecionarImagem = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permissão negada', 'Precisamos da permissão para acessar suas fotos');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImageUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Erro ao selecionar imagem:', error);
            Alert.alert('Erro', 'Não foi possível selecionar a imagem');
        }
    };

    // Função para preparar os dados do formulário para envio
    const prepararFormData = () => {
        const formData = new FormData();

        // Adicionar os dados do usuário
        formData.append('name', nome);
        formData.append('telefone', telefone);

        // Converter a data do formato DD/MM/AAAA para YYYY-MM-DD
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

        // Adicionar os dados do paciente
        formData.append('tipoAtendimento', tipoAtendimento);
        formData.append('trajetoriaProfissional', trajetoriaProfissional);
        formData.append('profileimg', profileimg);
        formData.append('email', email);
        formData.append('cpf', cpf);

        // Adicionar a imagem de perfil, se houver
        if (imageUri) {
            const filename = imageUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : 'image/jpeg';

            formData.append('profileimg', {
                uri: imageUri,
                name: filename,
                type,
            });
        }

        return formData;
    };

    // Função para salvar as alterações
    const salvarAlteracoes = async () => {
        try {
            console.log('Salvando alterações...');
            setIsLoading(true);

            // Verificar se os campos obrigatórios foram preenchidos
            if (!nome || !telefone || !cidade || !estado) {
                console.log('Campos obrigatórios não preenchidos');
                Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
                setIsLoading(false);
                return;
            }

            console.log('Campos obrigatórios preenchidos com sucesso!');

            // Verificar se a data está no formato correto
            if (nasc && !/^\d{2}\/\d{2}\/\d{4}$/.test(nasc)) {
                Alert.alert('Erro', 'A data de nascimento deve estar no formato DD/MM/AAAA');
                setIsLoading(false);
                return;
            }

            // Recuperar o token JWT
            const token = await AsyncStorage.getItem('tokenjwt');

            if (!token) {
                Alert.alert('Erro', 'Você precisa estar logado para salvar alterações');
                router.push('/Login');
                setIsLoading(false);
                return;
            }

            // Configurar o cabeçalho da requisição
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            api.defaults.headers.common['Content-Type'] = 'multipart/form-data';

            // Preparar os dados do formulário
            const formData = prepararFormData();
            console.log('Dados do formulário:', formData);

            // Enviar a requisição para o servidor
            const response = await api.put(`/usuario-paciente/${idUsuario}`, formData);

            if (response.status === 200) {
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso', [
                    { text: 'OK', onPress: () => router.back() }
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

    // Função para excluir o perfil
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

                            // Recuperar o token JWT
                            const token = await AsyncStorage.getItem('tokenjwt');

                            if (!token) {
                                Alert.alert('Erro', 'Você precisa estar logado para excluir seu perfil');
                                router.push('/Login');
                                setIsLoading(false);
                                return;
                            }

                            // Configurar o cabeçalho da requisição
                            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                            // Enviar a requisição para o servidor
                            const response = await api.delete(`/usuario-delete/${idUsuario}`);

                            if (response.status === 200) {
                                // Limpar os dados de autenticação
                                await AsyncStorage.removeItem('tokenjwt');
                                await AsyncStorage.removeItem('idUsuario');

                                Alert.alert('Sucesso', 'Perfil excluído com sucesso', [
                                    { text: 'OK', onPress: () => router.push('/') }
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

                <Input label={'Nome completo'} placeholder={'Digite seu nome completo'} onChangeText={setNome} />
                <Input label={'Telefone / Celular'} placeholder={'Digite seu Telefone / Celular'} onChangeText={setTelefone} keyboardType="numeric" />
                <Input label={'Data de Nascimento'} placeholder={'xx/xx/xxxx'} onChangeText={setNasc} />
                <Input label={'Cidade'} placeholder={'Digite sua Cidade'} onChangeText={setCidade} />
                <Input label={'Estado'} placeholder={'Digite seu Estado'} onChangeText={setEstado} />

                <InputRadio
                    labelExterna={'Qual o seu tipo de atendimento ?'}
                    options={[
                        { label: 'Voluntário', value: 'voluntario' },
                        { label: 'Valor Social', value: 'valor social' },
                    ]}
                    checkedValue={tipoAtendimento}
                    onChange={setTipoAtendimento}

                />
                <InputArea label={'Descreva a sua trajetória profissional'} placeholder={'Digite sua trajetória'} onChangeText={setTrajetoriaProfissional} />

                <Text style={EstiloGeral.h2}>Insira sua foto de perfil</Text>
                {/* Exibir imagem de perfil atual ou a selecionada */}
                {(profileImage || imageUri) && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: imageUri || profileImage }}
                            style={styles.profileImage}
                        />
                    </View>
                )}


                <Botao
                    texto={'Selecionar Imagem'}
                    onPress={selecionarImagem}
                    corFundo="#1696de"
                    corTexto="white"
                    marginTop={10}
                />

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
                    disabled={isLoading} />

            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fffaf5',
    },
    contentContainer: {
        alignItems: 'center',
        // paddingBottom: 40,
        flexGrow: 1,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
});