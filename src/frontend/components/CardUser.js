import { View, Text, Image } from "react-native";
import EstiloGeral from "../app/EstiloGeral";
import IconButton from "./IconButton";
import Spacer from "./Spacer";

function CardUser({ foto, nome, idade, topicos, pathIcone, textosDescricao }) {
    return (
        <View>
            <Spacer spaceHeight={15} />
            <View style={{ alignItems: "center" }}>
                <View style={EstiloGeral.circleBackgroud}>
                    <Image
                        source={{ uri: 'https://drive.google.com/uc?export=view&id=' + foto }}
                        style={EstiloGeral.iconUser}
                        resizeMode="cover"
                    />
                </View>
                <View>
                    <Text style={EstiloGeral.titleNameCard}>
                        {nome}
                    </Text>
                    <Text style={EstiloGeral.subtitleNameCard}>
                        {idade}
                    </Text>
                    <Spacer spaceHeight={5} />
                </View>
            </View>
            <View style={EstiloGeral.cardUserContainer}>
                <View style={{ marginLeft: 35 }}>
                    {topicos.map((topico, index) => (
                        <View key={index}>
                            <Text style={EstiloGeral.cardH2}>
                                {topico}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={pathIcone[index]}
                                    style={EstiloGeral.iconTopics}
                                    resizeMode="contain"
                                />
                                <Text style={EstiloGeral.textDescription}>
                                    {textosDescricao[index]}
                                </Text>
                            </View>
                            <Spacer spaceHeight={15} />
                        </View>
                    ))}
                </View>
            </View>
            <Spacer spaceHeight={10} />
            <View style={{ alignItems: "center" }}>
                <IconButton pathIcon={require('../assets/imgs/icone-contatos.png')} texto={'Contatos'} corFundo="#1696de" corTexto="white" marginTop={10} />
            </View>
            <Spacer spaceHeight={10} />
        </View>
    );
}

export default CardUser;
