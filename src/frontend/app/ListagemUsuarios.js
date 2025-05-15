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
            let listUsers = [];
            if (res1.data.some(item => item.email == email)) {
                let currentUser = res1.data.find(item => item.email === email)
                setCurrentNameUser(currentUser.name.split(' ')[0]);
                tipoPerfil = currentUser.tipoPerfil;
                setCurrentTipoPerfil(currentUser.tipoPerfil);
                if (currentUser.paciente != null || currentUser.profissional != null) {
                    listUsers = res2.data.filter(item => item.paciente != null)
                } else {
                    if (currentUser.tipoPerfil == 'paciente') {
                        listUsers = res1.data.filter(
                            item => item.tipoPerfil != 'paciente'
                                && item.profissional != null
                        )
                    } else {
                        listUsers = res2.data.filter(
                            item => item.tipoPerfil != 'profissional'
                                && item.paciente != null
                        )
                    }
                }
            } else if (res2.data.some(item => item.email == email)) {
                let currentUser = res2.data.find(item => item.email === email)
                setCurrentNameUser(currentUser.name.split(' ')[0]);
                tipoPerfil = currentUser.tipoPerfil;
                setCurrentTipoPerfil(currentUser.tipoPerfil);
                if (currentUser.paciente != null || currentUser.profissional != null) {
                    listUsers = res1.data.filter(item => item.profissional != null)
                } else {
                    if (currentUser.tipoPerfil == 'paciente') {
                        listUsers = res1.data.filter(
                            item => item.tipoPerfil != 'paciente'
                                && item.profissional != null
                        )
                    } else {
                        listUsers = res2.data.filter(
                            item => item.tipoPerfil != 'profissional'
                                && item.paciente != null
                        )
                    }
                }
            } else {
                throw new Error("Usuário não encontrado.");
            }
            setUsers(listUsers);
        } catch (e) {
            Alert.alert(
                "Atenção",
                `Erro ao carregar lista, o servidor retornou: ` +
                (e.response?.data?.message || "Usuário não encontrado.")
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
            : ['Modalidade', 'Localização',/* 'Possui diagnóstico', */'Encaminhamento', 'Principais queixas'];
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
                //require('../assets/imgs/icone-diagnostico.png'),
                require('../assets/imgs/icone-encaminhamento.png'),
                require('../assets/imgs/icone-trajetoria.png')
            ]
        }
    }

    function capitalize(word) {
        return String(word).charAt(0).toUpperCase() + String(word).slice(1);
    }

    function getTextDescription(user) {
        if (currentTipoPerfil == "paciente") {
            return [
                `${user.profissional?.tipoAtendimento === 'valorsocial' ? 'Valor social'
                    : user.profissional?.tipoAtendimento === 'voluntario' ? "Voluntário"
                        : capitalize(user.profissional?.tipoAtendimento)}`,
                `${capitalize(user.cidade)}/${user.estado}`,
                `${capitalize(user.profissional?.trajetoriaProfissional)}`
            ]
        } else {
            return [
                `${user.paciente?.necessidadeAtendimento === 'valorsocial' ? 'Valor social'
                    : user.paciente?.necessidadeAtendimento === 'voluntario' ? "Voluntário"
                        : capitalize(user.paciente?.necessidadeAtendimento)}`,
                `${capitalize(user.cidade)}/${user.estado}`,
                //`${user.paciente?.qualDiagnostico}`,
                `${user.paciente?.encaminhamento === 'medico' ? 'Médico'
                    : user.paciente?.encaminhamento === 'psicologo' ? 'Psicólogo'
                        : capitalize(user.paciente?.encaminhamento)}`,
                `${capitalize(user.paciente?.queixas)}`
            ]
        }
    }

    return (
        <ScrollView>
            <StatusBar style="auto" />
            <HeaderListagem titulo={`Seja bem-vindo ${currentNameUser}!`} />
            <SubHeader conteudo={"Com base no seu perfil,\nencontramos os resultados:"} />
            {users.map((user) => (
                <View key={user.id}>
                    <CardUser
                        foto={user.paciente?.profileimg || user.profissional?.profileimg || require('../assets/imgs/icone-padrao-usuario.png')}
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
