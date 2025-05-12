import { useEffect, useState } from "react";
import {StatusBar} from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import EstiloGeral from "./EstiloGeral";
import Header from "../components/Header";
import  SubHeader from "../components/SubHeader";
import InputRadio from "../components/InputRadio";
import Botao from "../components/Botao";
import Input from "../components/Input";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhotoInput from "../components/PhotoInput";

export default function CadastroEspecializacaoUsuarioProfissional() {


    
       const router = useRouter();
        const [tipoAtendimento, setTipoAtendimento] = useState("");
        const [diagnosticoPrevio, setDiagnosticoPrevio] = useState("");
        const [diagnostico, setDiagnostico] = useState("");
        const [encaminhamento, setEncaminhamento] = useState("");
        const [queixas, setQueixas] = useState("");
       const [idUsuario, setIdUsuario] = useState('')
       const [googleDriveField, setGoogleDriveField] = useState('');
    
       const getId = async () => {
          try {
             const idUsuario = await AsyncStorage.getItem("idUsuario");
             setIdUsuario(idUsuario);
          } catch (error) {
             console.log(error);
          }
       };
    
       useEffect(() => {
          getId()
       },[])
    
        async function handleCadastrar() {
            if (
                tipoAtendimento === "" ||
                diagnosticoPrevio === "" ||
                encaminhamento === "" ||
                queixas === "" 
               
            ) {
                Alert.alert("Atenção", "Preencha todos os campos!");
            } else {
                try {
                    const resApi = await api.post("/cadastro-profissional", {
                        necessidadeAtendimento: tipoAtendimento,
                        diagnostico: diagnostico,
                        qualDiagnostico: diagnosticoPrevio,
                        encaminhamento: encaminhamento,
                        queixas: queixas,
                        profileimg: googleDriveField,
                        usuarioId: idUsuario,
                    });
    
                    Alert.alert(
                        "Sucesso!",
                        "Segunda etapa finalizada com sucesso."
                    );
    
                    router.push("/Login");
                } catch (e) {
                    if (e.response) {
                        Alert.alert(
                            "Erro ao cadastrar",
                            `Status: ${e.response.status}\nMensagem: ${e.response.data.message}`
                        );
                        console.error("Erro detalhado:", e.response.data);
                    } else if (e.request) {
                        Alert.alert(
                            "Erro ao cadastrar",
                            "Nenhuma resposta do servidor."
                        );
                        console.error("Erro na requisição:", e.request);
                    } else {
                        Alert.alert(
                            "Erro ao cadastrar",
                            "Erro ao configurar a requisição."
                        );
                        console.error("Erro desconhecido:", e.message);
                    }
                }
            }
        }
    
        return (
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                <StatusBar style="auto" />
    
                <Header titulo={"Cadastro"} />
                <SubHeader
                    conteudo={
                        "Precisamos de mais informações para completar seu cadastro!"
                    }
                />
    
                <View style={EstiloGeral.containerInputsGeral}>
                    <InputRadio
                        labelExterna={"Qual seu tipo de atendimento?"}
                        options={[
                            { label: "Voluntario", value: "voluntario" },
                            { label: "Valor Social", value: "valorsocial" },
                        ]}
                        checkedValue={tipoAtendimento}
                        onChange={setTipoAtendimento}
                    />
                
    
                    <Input
                        label={"Descreva sua trajetória profissional"}
                        placeholder={""}
                        onChangeText={setQueixas}
                        minHeight={150}
                    />
    
                    <PhotoInput
                        texto={"Insira foto de perfil"}
                        corFundo="#1696de"
                        corTexto="white"
                        onChangeImage={(id) => setGoogleDriveField(id)} // <- supondo que PhotoInput retorna isso 

                    />
    
                    <Botao
                        texto={"Avançar"}
                        onPress={handleCadastrar}
                        corFundo="#1696de"
                        corTexto="white"
                        marginTop={10}
                    />
                </View>
            </ScrollView>
        );
    }
    
    const styles = StyleSheet.create({
        scrollView: {
            flex: 1,
            backgroundColor: "#fffaf5",
        },
        contentContainer: {
            alignItems: "center",
            // paddingBottom: 40,
            flexGrow: 1,
        },
    });

    
    
