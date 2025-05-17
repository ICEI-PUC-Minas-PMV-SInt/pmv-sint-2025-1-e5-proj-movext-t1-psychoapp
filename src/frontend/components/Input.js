import { View, Text, TextInput, StyleSheet } from "react-native";
import EstiloGeral from "../app/EstiloGeral";

function Input({label, placeholder, onChangeText, secureTextEntry, multiline, numberOfLines, value}) { // Adicionada a prop value
    
    // Estilo base do input, vindo do EstiloGeral
    const inputStyle = [EstiloGeral.input];

    // Se multiline for true, adiciona estilos específicos para textarea
    if (multiline) {
        inputStyle.push(styles.textAreaStyle);
    }
    
    return (
        <View style={EstiloGeral.inputContainer}>
            
            <Text style={EstiloGeral.label}>{label}</Text>
            
            <TextInput
                secureTextEntry={secureTextEntry}
                style={inputStyle} // Aplica o array de estilos
                placeholder={placeholder}
                placeholderTextColor="#999"
                onChangeText={onChangeText}
                value={value} // Adicionado para controle do valor
                multiline={multiline}
                numberOfLines={numberOfLines} // Sugestão de número de linhas para Android
                // textAlignVertical é útil para multiline no Android
                textAlignVertical={multiline ? 'top' : 'auto'} 
            />
        </View>
    );
}

// Estilos locais para o componente Input, especificamente para o modo textarea
const styles = StyleSheet.create({
    textAreaStyle: {
        height: 130, 
        paddingTop: 10, 
        borderRadius: 20, 
    }
});

export default Input;