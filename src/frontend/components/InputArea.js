import { View, Text, TextInput, StyleSheet } from "react-native";
import EstiloGeral from "../app/EstiloGeral";

function InputArea({label, placeholder, onChangeText, secureTextEntry, defaultValue}) {
    return (
        <View style={EstiloGeral.inputContainer}>
            
            <Text style={EstiloGeral.label}>{label}</Text>
            
            <TextInput
                secureTextEntry={secureTextEntry}
                style={styles.textAreaStyle} // Aplica o array de estilos
                placeholder={placeholder}
                placeholderTextColor="#999"
                onChangeText={onChangeText}
                textAlignVertical='top'
                multiline
                defaultValue={defaultValue}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textAreaStyle: {
        fontFamily: 'PlaypenSans_400Regular',
        paddingLeft: 20,
        width: '100%',
        height: 50,
        borderRadius: 50,   
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#c8c8c8',
        height: 130, 
        paddingTop: 10, 
        borderRadius: 20, 
    }
});

export default InputArea; 