import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import EstiloGeral from "./EstiloGeral";
import Botao from "../components/Botao";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import Input from "../components/Input";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	async function handleLogin() {
		if (email === "" || senha === "") {
			Alert.alert("Atenção", "Preencha todos os campos!");
		} else {
			try {
				const resApi = await api.post("/login", {
					email: email,
					password: senha,
				});

				const token = resApi.data.token;

				await AsyncStorage.setItem("tokenjwt", token);
				await AsyncStorage.setItem("email", email);

				Alert.alert("Sucesso!", "Login bem-sucedido! Redirecionando...");

				router.push("/ListagemUsuarios"); // Após login bem sucedido, aqui vai direcionar para a página a ser criada de listagem de usuários de acordo com o tipo de perfil.
			} catch (e) {
				Alert.alert(
					"Atenção",
					"Erro ao fazer login, o servidor retornou: " +
						e.response.data.message
				);
			}
		}
	}

	return (
		<View style={EstiloGeral.body}>
			<StatusBar style="auto" />

			<Header titulo={"Login"} />
			<SubHeader conteudo={"Preencha as informações para fazer login"} />

			<View style={EstiloGeral.containerInputsGeral}>
				<Input
					label={"E-mail"}
					placeholder={"Digite seu e-mail"}
					onChangeText={(e) => setEmail(e)}
				/>
				<Input
					secureTextEntry={true}
					label={"Senha"}
					placeholder={"Digite sua senha"}
					onChangeText={(e) => setSenha(e)}
				/>

				<Botao
					marginTop={20}
					texto={"Entrar"}
					corFundo="#1696de"
					corTexto="white"
					onPress={() => {
						handleLogin();
					}}
				/>

				<Text style={EstiloGeral.h2}>Não tem cadastro?</Text>

				<Botao
					texto={"Cadastre-se"}
					onPress={() => {
						router.push("/Cadastro");
					}}
				/>
			</View>
		</View>
	);
}
