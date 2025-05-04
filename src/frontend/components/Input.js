import { View, Text, TextInput } from "react-native";
import EstiloGeral from "../app/EstiloGeral";

function Input({label, placeholder, onChangeText, secureTextEntry, minHeight}) {
    return (
        <View style={EstiloGeral.inputContainer}>
            
            <Text style={EstiloGeral.label}>{label}</Text>
            
            <TextInput
                secureTextEntry={secureTextEntry}
                style={EstiloGeral.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                onChangeText={onChangeText}
                minHeight={minHeight}
            />
        </View>
    );
}

export default Input;