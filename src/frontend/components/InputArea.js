import { View, Text, TextInput } from "react-native";
import EstiloGeral from "../app/EstiloGeral";

function InputArea({label, placeholder, onChangeText, secureTextEntry, defaultValue}) {
    return (
        <View style={EstiloGeral.inputContainer}>
            
            <Text style={EstiloGeral.label}>{label}</Text>
            
            <TextInput
                secureTextEntry={secureTextEntry}
                style={EstiloGeral.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                onChangeText={onChangeText}
                multiline
                defaultValue={defaultValue}
            />
        </View>
    );
}

export default InputArea; 