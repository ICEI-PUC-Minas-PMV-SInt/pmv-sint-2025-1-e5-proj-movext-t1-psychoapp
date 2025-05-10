import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import HeaderListagem from "../components/HeaderListagem";
import SubHeader from "../components/SubHeader";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardUser from "../components/CardUser";
import EstiloGeral from "./EstiloGeral";

export default function ListagemUsuarios() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    let nomeUsuario = "";
    let isPaciente = true;
    let urlRequest = "";
    let tipoPerfil = "";

    async function getNameAndTypePerfil() {
        nomeUsuario = "" // recuperar o nome do usuario atual para colocar no header
        isPaciente = true // recuperar o tipoPerfil do usuario atual para fazer a logica
    }

    async function getUsersList() {
        try {
            const tokenjwt = await AsyncStorage.getItem("tokenjwt");
            if (isPaciente) {
                tipoPerfil = "paciente"
                urlRequest = "/list-profissionais"
            } else {
                tipoPerfil = "psicopedagogo"
                urlRequest = "/list-pacientes"
            }
            const resApi = await api.get(urlRequest, {
                headers: {
                    Authorization: `Bearer ${tokenjwt}`
                }
            });
            setUsers(resApi.data.filter(item => item.tipoPerfil != tipoPerfil));
            console.log(resApi.data);
            // console.log(users);
        } catch (e) {
            Alert.alert(
                "Atenção",
                `Erro ao carregar lista de ${tipoUsuario}, o servidor retornou: ` +
                e.response.data.message
            );
        }
    }

    useEffect(() => {
        getNameAndTypePerfil();
        getUsersList();
    }, []);

    const calcularIdade = (dataNascimentoStr) => {
        const nascimento = new Date(dataNascimentoStr);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade.toString().padStart(2, '0') + ' anos';
    };

    function getTopics() {
        return isPaciente
            ? ['Modalidade', 'Localização', 'Trajetória profissional']
            : ['Modalidade', 'Localização', 'Possui diagnóstico', 'Encaminhamento', 'Principais queixas'];
    }

    function getIcons() {
        if (isPaciente) {
            return [
                require('../assets/imgs/icone-modalidade.png'),
                require('../assets/imgs/icone-localizacao.png'),
                require('../assets/imgs/icone-trajetoria.png')
            ]
        } else {
            return [
                require('../assets/imgs/icone-modalidade.png'),
                require('../assets/imgs/icone-localizacao.png'),
                require('../assets/imgs/icone-diagnostico.png'),
                require('../assets/imgs/icone-encaminhamento.png'),
                require('../assets/imgs/icone-trajetoria.png')
            ]
        }
    }


    function getTextDescription(user) {
        if (isPaciente) {
            return [
                `${user.tipoAtendimento}`,
                `${user.cidade}/${user.estado}`,
                `${user.trajetoriaProfissional}`
            ]
        } else {
            return [
                `${user.necessidadeAtendimento}`,
                `${user.cidade}/${user.estado}`,
                `${user.qualDiagnostico}`,
                `${user.encaminhamento}`,
                `${user.queixas}`
            ]
        }
    }

    return (
        <ScrollView>
            <StatusBar style="auto" />
            <HeaderListagem titulo={`Seja bem vindo ${nomeUsuario}!`} />
            <SubHeader conteudo={"Com base no seu perfil,\nencontramos os resultados:"} />
            {users.map((user) => (
                <View key={user.id}>
                    <CardUser
                        foto={require('../assets/imgs/icone-padrao-usuario.png')}
                        nome={user.name}
                        idade={calcularIdade(user.dataNascimento)}
                        topicos={getTopics()}
                        pathIcone={getIcons()}
                        textosDescricao={getTextDescription(user)}
                    />
                </View>
            ))}
        </ScrollView>
    );

}
