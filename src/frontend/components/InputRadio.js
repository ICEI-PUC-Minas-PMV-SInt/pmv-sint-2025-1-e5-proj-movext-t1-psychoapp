import { Text, View, TouchableOpacity } from "react-native";
import EstiloGeral from "../app/EstiloGeral";
import { MaterialIcons } from '@expo/vector-icons';

function InputRadio({options, checkedValue, onChange, labelExterna}) {
    return (
        <View style={{width: '80%'}}>

            <Text style={EstiloGeral.label}>{labelExterna}</Text>

            <View style={EstiloGeral.inputRadioContainer}>
            
                {options.map((option) =>{

                    return(
                        <TouchableOpacity style={{flexDirection:'row'}} key={option.value} onPress={() => onChange(option.value)}>

                            <MaterialIcons style={{marginRight:5}} name={checkedValue === option.value ? "radio-button-checked" : "radio-button-unchecked"} size={24} color="#1696de" />
                            <Text style={EstiloGeral.inputRadio}>{option.label}</Text>

                        </TouchableOpacity>
                    )
                })}
                
                </View>
        </View>
    );
}

export default InputRadio;