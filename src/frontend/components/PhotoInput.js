import React, { useState } from "react";
import { View, Image, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Botao from "./Botao"; 

const PhotoInput = ({ corFundo, corTexto, texto, onChange, marginTop }) => {
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos acessar sua galeria para selecionar uma foto."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
      if (onChange) onChange(uri);
    }
  };

  return (
    <View style={[styles.container, {marginTop :marginTop}]}>
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

export default PhotoInput;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
});
