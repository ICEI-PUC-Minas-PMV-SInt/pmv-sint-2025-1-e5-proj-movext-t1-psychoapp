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
    const [currentNameUser, setCurrentNameUser] = useState([])
    const [users, setUsers] = useState([]);
    const [currentTipoPerfil, setCurrentTipoPerfil] = useState([])
    let tipoPerfil = "";

    async function getUsersList() {
        try {
            const tokenjwt = await AsyncStorage.getItem("tokenjwt");
            const [res1, res2] = await Promise.all([
                api.get("/list-profissionais", {
                    headers: { Authorization: `Bearer ${tokenjwt}` }
                }),
                api.get("/list-pacientes", {
                    headers: { Authorization: `Bearer ${tokenjwt}` }
                })
            ]);
            const email = await AsyncStorage.getItem("email");
            if (res1.data.some(item => item.email == email)) {
                let currentUser = res1.data.find(item => item.email === email)
                setCurrentNameUser(currentUser.name.split(' ')[0]);
                tipoPerfil = currentUser.tipoPerfil;
                setCurrentTipoPerfil(currentUser.tipoPerfil);
            } else if (res2.data.some(item => item.email == email)) {
                let currentUser = res2.data.find(item => item.email === email)
                setCurrentNameUser(currentUser.name.split(' ')[0]);
                tipoPerfil = currentUser.tipoPerfil;
                setCurrentTipoPerfil(currentUser.tipoPerfil);
            } else {
                throw new Error("Usuario invalido!");
            }
            let listUsers = res1.data.filter(item => item.tipoPerfil != tipoPerfil)
            setUsers(listUsers);
        } catch (e) {
            Alert.alert(
                "Atenção",
                `Erro ao carregar lista, o servidor retornou: ` +
                e.response.data.message
            );
        }
    }

    useEffect(() => {
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
        return currentTipoPerfil == "paciente"
            ? ['Modalidade', 'Localização', 'Trajetória profissional']
            : ['Modalidade', 'Localização', 'Possui diagnóstico', 'Encaminhamento', 'Principais queixas'];
    }

    function getIcons() {
        if (currentTipoPerfil == "paciente") {
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
        if (currentTipoPerfil == "paciente") {
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
            <HeaderListagem titulo={`Seja bem vindo ${currentNameUser}!`} />
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
