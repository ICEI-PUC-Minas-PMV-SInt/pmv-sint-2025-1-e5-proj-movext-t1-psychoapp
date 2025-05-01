import { View, Text, TextInput } from "react-native";
import EstiloGeral from "../app/EstiloGeral";

function Input({label, placeholder, onChangeText}) {
    return (
        <View style={EstiloGeral.inputContainer}>
            
            <Text style={EstiloGeral.label}>{label}</Text>
            
            <TextInput
                style={EstiloGeral.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                onChangeText={onChangeText}
            />
        </View>
    );
}

export default Input;