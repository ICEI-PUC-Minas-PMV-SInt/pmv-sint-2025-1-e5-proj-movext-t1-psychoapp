import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import EstiloGeral from './EstiloGeral';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import InputRadio from '../components/InputRadio';
import Botao from '../components/Botao';
import Input from '../components/Input';
import InputArea from '../components/InputArea';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [profileimg, setProfileImg] = useState(null);
    const [idUsuario, setIdUsuario] = useState(null);


    async function handleAlterarPerfilProfissional() {

        const resApi = await api.put(`/usuario-profissional/${idUsuario}`, {
            nome,
            cpf,
            email,
            telefone,
            nasc,
            cidade,
            estado,
            senha,
            tipoAtendimento,
            trajetoriaProfissional,
            profileimg
        });

        if (resApi.status === 200) {
            Alert.alert('Usuário atualizado com sucesso.');
            router.push('/usuario-profissional/:id');
        }
        else {
            Alert.alert('Erro ao atualizar usuário. O servidor retornou: ' + resApi.status);
        }
    }
    
    async function DeleteUsuario() {
        const resApi = await api.delete(`/usuario-delete/${idUsuario}`);
        if (resApi.status === 200) {
            Alert.alert('Usuário excluído com sucesso.');
            router.push('/usuario-delete/:id');
        }
        else {
            Alert.alert('Erro ao deletar usuário. O servidor retornou: ' + resApi.status);
        }
    }


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
                <Input secureTextEntry={true} label={'Senha'} placeholder={'Digite sua Senha'} onChangeText={setSenha} />

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


                <Botao texto={'Salvar'} onPress={() => router.push('/usuario-profissional/:id')} />
                <Botao texto={'Apagar'} onPress={() => router.push('/usuario-delete/:id')} />

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

});