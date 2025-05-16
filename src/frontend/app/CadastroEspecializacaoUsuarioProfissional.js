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
       const [trajetoriaProfissional, setTrajetoriaProfissional] = useState("")
       const [idUsuario, setIdUsuario] = useState('')
       const [googleDriveField, setGoogleDriveField] = useState('');
        const [photo, setPhoto] = useState(null);
    
       const getId = async () => {
          try {
             const idUsuario = await AsyncStorage.getItem("idUsuario");
             setIdUsuario(idUsuario);
          } catch (error) {
             console.log(error);
          }
       };
    
       useEffect(() => {
          getId();
       },[]);
    
        async function handleCadastrar() {
            if (
                tipoAtendimento === "" ||
                trajetoriaProfissional === "" 
                
            
             ) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }
                try {
                    const formData = new FormData();
                        formData.append("tipoAtendimento", tipoAtendimento);
                         formData.append("trajetoriaProfissional", trajetoriaProfissional);
                         formData.append("usuarioId", idUsuario);
                
                    if (photo) {
                        const uriParts = photo.split(".");
                        const fileType = uriParts[uriParts.length - 1];

                        formData.append("profileimg", {
          uri: photo,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });
                    }
                const response = await fetch(
        
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            // NÃO inclua o Content-Type aqui — o fetch vai incluir com o boundary automaticamente
          },
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro: ${response.status} - ${errorText}`);
      }

      Alert.alert("Sucesso!", "Segunda etapa finalizada com sucesso.");
      router.push("/Login");
    } catch (e) {
      if (e.response) {
        Alert.alert(
          "Erro ao cadastrar",
          `Status: ${e.response.status}\nMensagem: ${e.response.data.message}`
        );
        console.error("Erro detalhado:", e.response.data);
      } else if (e.request) {
        Alert.alert("Erro ao cadastrar", "Nenhuma resposta do servidor.");
        console.error("Erro na requisição:", e.request);
      } else {
        Alert.alert("Erro ao cadastrar", "Erro ao configurar a requisição.");
        console.error("Erro desconhecido:", e.message);
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
                        labelExterna={'Qual seu tipo de atendimento?'}
                        options={[
                            { label: 'Voluntario', value: 'voluntario' },
                            { label: 'Valor Social', value: 'valorsocial' },
                        ]}
                        checkedValue={tipoAtendimento}
                        onChange={setTipoAtendimento}
                    />
                
    
                    <Input
                        label={"Descreva sua trajetória profissional"}
                        placeholder={""}
                        onChangeText={setTrajetoriaProfissional}
                        minHeight={100}
                    />
    
                    <PhotoInput
                        texto={"Insira foto de perfil"}
                        corFundo="#1696de"
                        corTexto="white"
                        marginTop={50}
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

    
    
