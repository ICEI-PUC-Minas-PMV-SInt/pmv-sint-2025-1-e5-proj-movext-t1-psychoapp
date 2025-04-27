import React from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import EstiloGeral from "../app/EstiloGeral";

function Botao({ texto, onPress, corFundo = 'white', corTexto = '#1696de' }) {
  return (
    <TouchableOpacity style={[EstiloGeral.botao, { backgroundColor: corFundo }]} onPress={onPress}>
      <Text style={[EstiloGeral.textoBotao, { color: corTexto }]}>{texto}</Text>
    </TouchableOpacity>
  );
}

export default Botao;