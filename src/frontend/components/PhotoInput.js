<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import EstiloGeral from "../app/EstiloGeral"; // Ajuste o caminho se necessário
import { FontAwesome } from '@expo/vector-icons';

function PhotoInput({ label, onImageSelected, initialImageUri }) {
    const [imageUri, setImageUri] = useState(initialImageUri || null);

    useEffect(() => {
        // Atualiza a imagem exibida se initialImageUri mudar
        setImageUri(initialImageUri || null);
    }, [initialImageUri]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (galleryStatus.status !== 'granted') {
                    Alert.alert('Permissão necessária', 'Desculpe, precisamos de permissão para acessar sua galeria de fotos.');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedUri = result.assets[0].uri;
            setImageUri(selectedUri);
            if (onImageSelected) {
                onImageSelected(selectedUri);
            }
        }
    };

    return (
        <View style={styles.container}>
            {label && <Text style={[EstiloGeral.label, styles.label]}>{label}</Text>}
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                ) : (
                    <View style={styles.placeholder}>
                        <Image source={require('../assets/imgs/img-placeholder.png')} style={{ width: 60, height: 55 }} />
                        <Text style={styles.placeholderText}>Buscar Imagem</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20, // Aumentado para mais espaço
        width: '90%', // Para alinhar com outros inputs que podem ter margem/padding
        alignItems: 'center',
    },
    label: {
        marginBottom: 8,
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#646464',
        paddingLeft: 20,
    },
    imagePicker: {
        width: 170,
        height: 170,
        borderRadius: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#c8c8c8',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontFamily: 'PlaypenSans_400Regular',
        marginTop: 10,
        color: '#555',
        fontSize: 14,
    },
});

export default PhotoInput;
>>>>>>> temp-branch
