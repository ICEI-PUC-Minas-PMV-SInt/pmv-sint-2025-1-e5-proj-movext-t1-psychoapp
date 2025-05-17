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
                        <FontAwesome name="camera" size={30} color="#888" />
                        <Text style={styles.placeholderText}>Selecionar Imagem</Text>
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
        color: '#333',
        // marginLeft: '5%', // Removido para centralizar o label com o container
    },
    imagePicker: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#e9e9e9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
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
        marginTop: 10,
        color: '#555',
        fontSize: 14,
    },
});

export default PhotoInput;