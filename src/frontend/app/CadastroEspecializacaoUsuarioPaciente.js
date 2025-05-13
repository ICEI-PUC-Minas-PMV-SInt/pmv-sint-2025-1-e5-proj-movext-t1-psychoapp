import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import EstiloGeral from "./EstiloGeral";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import InputRadio from "../components/InputRadio";
import Botao from "../components/Botao";
import Input from "../components/Input";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhotoInput from "../components/PhotoInput";

export default function CadastroEspecializacaoUsuarioPaciente() {
  const router = useRouter();
  const [necessidadeAtendimento, setNecessidadeAtendimento] = useState("");
  const [qualDiagnostico, setQualDiagnostico] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [encaminhamento, setEncaminhamento] = useState("");
  const [queixas, setQueixas] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
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
  }, []);

  async function handleCadastrar() {
    if (
      necessidadeAtendimento === "" ||
      qualDiagnostico === "" ||
      encaminhamento === ""
    ) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("necessidadeAtendimento", necessidadeAtendimento);
      formData.append("diagnostico", diagnostico);
      formData.append("qualDiagnostico", qualDiagnostico);
      formData.append("encaminhamento", encaminhamento);
      formData.append("queixas", queixas);
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
        "https://app-api-six.vercel.app/cadastro-paciente",
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
          "Precisamos de mais informalções sobre o paciente para melhor atendimento!"
        }
      />

      <View style={EstiloGeral.containerInputsGeral}>
        <InputRadio
          labelExterna={"Qual a Necessidade de atendimento?"}
          options={[
            { label: "Voluentario", value: "voluntario" },
            { label: "Valor Social", value: "valorsocial" },
          ]}
          checkedValue={necessidadeAtendimento}
          onChange={setNecessidadeAtendimento}
        />

        <InputRadio
          labelExterna={"Já existe algum diagnóstico?"}
          options={[
            { label: "Sim", value: true },
            { label: "Não", value: false },
          ]}
          checkedValue={qualDiagnostico}
          onChange={setQualDiagnostico}
        />

        <Input
          label={"Se sim qual?"}
          placeholder={"Digite seu diagnóstico"}
          onChangeText={setDiagnostico}
        />

        <InputRadio
          labelExterna={"De onde partiu o encaminhamento?"}
          options={[
            { label: "Escola", value: "escola" },
            { label: "Médico", value: "medico" },
            { label: "Psicólogo", value: "psicologo" },
          ]}
          checkedValue={encaminhamento}
          onChange={setEncaminhamento}
        />

        <Input
          label={"Descreva as princiapis queixas"}
          placeholder={""}
          onChangeText={setQueixas}
          minHeight={100}
        />

        <PhotoInput
          texto={"Insira foto de perfil"}
          photo={photo}
          onChange={setPhoto}
          corFundo="#1696de"
          corTexto="white"
		  marginTop={50}
        />

        <Botao
          texto={"Avançar"}
          onPress={handleCadastrar}
          corFundo="#1696de"
          corTexto="white"
		  
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
