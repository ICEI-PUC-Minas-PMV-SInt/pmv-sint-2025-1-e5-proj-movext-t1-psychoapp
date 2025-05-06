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

export default function AlterarPerfilPaciente() {
    const router = useRouter();
    const [tipoAtendimento, setTipoAtendimento] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nasc, setNasc] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [senha, setSenha] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [queixas, setQueixas] = useState('');
    const [encaminhamento, setEncaminhamento] = useState('');
    const [qualDiagnostico, setQualDiagnostico] = useState('');
    
    

        
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
                    labelExterna={'Qual a necessidade do atendimento ?'}
                    options={[
                        { label: 'Voluntário', value: 'voluntario' },
                        { label: 'Valor Social', value: 'valor social' },
                    ]}
                    checkedValue={tipoAtendimento}
                    onChange={setTipoAtendimento}

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
                <InputArea label={'Se sim, qual'} placeholder={''} onChangeText={setQualDiagnostico} />

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
                    <InputArea label={'Descreva as principais queixas'} placeholder={''} onChangeText={setQueixas} />


            <Text style={EstiloGeral.h2}>Insira sua foto de perfil</Text>


            <Botao texto={'Salvar'} onPress={() => router.push('')} />

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