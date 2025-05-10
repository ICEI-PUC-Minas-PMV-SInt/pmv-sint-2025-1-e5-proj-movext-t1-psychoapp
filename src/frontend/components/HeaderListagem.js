import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import EstiloGeral from "../app/EstiloGeral";

function HeaderListagem({titulo}) {

  const router = useRouter();

  return (
    <View style={EstiloGeral.header}>
        <Text style={EstiloGeral.tituloHeader}>{titulo}</Text>
    </View>
  );
}

export default HeaderListagem;