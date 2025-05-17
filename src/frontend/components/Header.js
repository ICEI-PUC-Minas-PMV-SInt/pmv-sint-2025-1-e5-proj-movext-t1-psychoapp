import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import EstiloGeral from "../app/EstiloGeral";
import { useRouter } from "expo-router";



// A prop 'imageSourceProp' agora espera o resultado de require() ou um objeto URI
function Header({ titulo, imageSourceProp }) { 

    const router = useRouter();


  return (
    <View style={EstiloGeral.header}>
        <TouchableOpacity style={EstiloGeral.linkGoBack} onPress={() => router.back()}>
          <Image source={require('../assets/imgs/seta-goback.png')} style={EstiloGeral.setaGoBack}/>
        </TouchableOpacity>
        <Text style={EstiloGeral.tituloHeader}>{titulo}</Text>

        {
          imageSourceProp && (
        <TouchableOpacity style={EstiloGeral.linkHamburger} onPress={() => router.push('/Menu')}>
          <Image source={require('../assets/imgs/hamburguer.png')} style={EstiloGeral.hamburguer}/>
        </TouchableOpacity>
          )
        }

    </View>
  );
}

export default Header;