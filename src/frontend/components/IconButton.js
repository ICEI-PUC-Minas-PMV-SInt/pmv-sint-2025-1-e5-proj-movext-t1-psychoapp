import { View, Image, Text, TouchableOpacity } from "react-native";
import Spacer from "./Spacer";
import EstiloGeral from "../app/EstiloGeral";

function IconButton({ pathIcon, texto, onPress, corFundo = 'white', marginTop = 0 }) {
    return (
        <TouchableOpacity style={[EstiloGeral.botao, { backgroundColor: corFundo }, { marginTop: marginTop }]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={pathIcon}
                    style={[EstiloGeral.iconTopics]}
                    resizeMode="contain"
                />
                <Spacer spaceWidth={10} />
                <Text style={EstiloGeral.textIconButton}>{texto}</Text>
            </View>
        </TouchableOpacity >
    );
}

export default IconButton;