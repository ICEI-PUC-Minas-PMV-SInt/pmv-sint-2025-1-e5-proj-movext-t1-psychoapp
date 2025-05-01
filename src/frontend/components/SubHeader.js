import React from "react-native";
import { View, Text } from "react-native";
import EstiloGeral from "../app/EstiloGeral";

function Header({conteudo}) {

  return (
    <View style={EstiloGeral.subHeader}>

        <Text style={EstiloGeral.conteudoSubHeader}>{conteudo}</Text>

    </View>
  );
}

export default Header;