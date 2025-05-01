import React from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import EstiloGeral from "../app/EstiloGeral";

function Botao({ texto, onPress, corFundo = 'white', corTexto = '#1696de', marginTop = 0 }) {
  return (
    <TouchableOpacity style={[EstiloGeral.botao, { backgroundColor: corFundo }, {marginTop: marginTop}]} onPress={onPress}>
      <Text style={[EstiloGeral.textoBotao, { color: corTexto }]}>{texto}</Text>
    </TouchableOpacity>
  );
}

export default Botao;