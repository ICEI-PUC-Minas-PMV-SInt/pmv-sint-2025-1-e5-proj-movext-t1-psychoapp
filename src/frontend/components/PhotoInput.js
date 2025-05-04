import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Botao from "./Botao";

const PhotoInput = ({corFundo,corTexto,texto}) => {
	const [photo, setPhoto] = useState(null);

	const pickImage = async () => {
		// Solicita permissão para acessar a galeria (Android/iOS)
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			Alert.alert(
				"Permissão necessária",
				"Precisamos acessar sua galeria para selecionar uma foto."
			);
			return;
		}

		// Abre a galeria
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images, // Somente imagens
			allowsEditing: true, // Permite edição (opcional)
			quality: 0.8, // Qualidade da imagem (0 a 1)
		});

		if (!result.canceled && result.assets && result.assets.length > 0) {
			setPhoto(result.assets[0].uri); // Atualiza o estado com a URI da imagem
		}
	};

	return (
		<View style={styles.container}>
			{photo && <Image source={{ uri: photo }} style={styles.image} />}
			<Botao
				corFundo={corFundo}
				corTexto={corTexto}
				texto={texto}
				onPress={pickImage}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginTop: 100,
		width: "100%",
	},
	image: {
		width: 200,
		height: 200,
		marginBottom: 10,
		borderRadius: 10,
	},
});

export default PhotoInput;
