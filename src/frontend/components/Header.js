import React from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import EstiloGeral from "../app/EstiloGeral";
import { useRouter } from "expo-router";

function Header({titulo}) {

    const router = useRouter();

  return (
    <View style={EstiloGeral.header}>

        <TouchableOpacity style={EstiloGeral.linkGoBack} onPress={() => router.back()}>
          <Image source={require('../assets/imgs/seta-goback.png')} style={EstiloGeral.setaGoBack}/>
        </TouchableOpacity>

        <Text style={EstiloGeral.tituloHeader}>{titulo}</Text>

    </View>
  );
}

export default Header;