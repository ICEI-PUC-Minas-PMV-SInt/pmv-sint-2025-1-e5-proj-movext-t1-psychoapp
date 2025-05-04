import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View} from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EstiloGeral from "./EstiloGeral";
import ElementoLista from "../components/ElementoLista";

export default function ListaProfissionais() {
	const router = useRouter();
	const [token, setToken] = useState();
	const [profissionais, setProfissionais] = useState([]);

   const getTokenProfissionais = async () => {
      try {
         
         const storedToken = await AsyncStorage.getItem("tokenjwt");
         setToken(storedToken);

         const res = await api.get("/list-profissionais", {
            headers: {
               Authorization: `Bearer ${storedToken}`,
            },
         });
         
         setProfissionais(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   
	useEffect(() => {
		
		getTokenProfissionais();
	}, []);

   const h2 = {
      a: 'Mensalidade',
      b:'Localização', 
      c:'Trajetório profissional'
   }

	return (
		<ScrollView
			style={styles.scrollview}
			contentContainerStyle={styles.contentContainer}
		>
			<StatusBar style="auto" />
			<Header titulo={"Seja bem vindo!"} />
			<SubHeader
				conteudo={"Com base no seu perfil,\nencontramos os resultados:"}
			/>
			{profissionais.length > 0 ? (profissionais.map((profissional) => (
		      <View key={profissional.id}>
			      <ElementoLista 
                  data={profissional} 
                  titulos={['Mensalidade','Localização', 'Trajetório profissional']}
                  />
		   </View>
	      ))
         ) : (
            <Text style={styles.emptyText}>
               Nenhum profissional encontrado.
            </Text>
         )}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollview: {
		flex: 1,
		backgroundColor: 'fffaf5',
	},
	contentContainer: {
		alignItems: "flex-start",
		flexGrow: 1,
	},
   card:{},
   nomeProf:{

   }
});
