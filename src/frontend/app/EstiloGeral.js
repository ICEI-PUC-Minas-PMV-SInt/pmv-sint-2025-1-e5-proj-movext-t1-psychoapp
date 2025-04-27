import { StyleSheet } from "react-native";
import {useFonts, PlaypenSans_400Regular, PlaypenSans_700Bold} from '@expo-google-fonts/playpen-sans'

const EstiloGeral = StyleSheet.create({

    body:{
        flex: 1,
        backgroundColor: '#fffaf5',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 30,
    },

    homeCenter:{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },

    header:{
        width: '100%',
        height: 80,
        backgroundColor: '#6ab54d',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    tituloHeader:{
        fontFamily: 'PlaypenSans_700Bold',
        fontSize: 25,
        color: 'white',
    },

    linkGoBack:{
        position: 'absolute',
        left: 15,
    },

    setaGoBack:{
        width: 35,
        height: 35,
    },

    logo:{
        width: 280,
        height: 134
    },

    faixaVerdeHome:{
        width: '100%',
        height: 130,
        backgroundColor: '#6ab54d',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },

    h1:{
        fontFamily: 'PlaypenSans_400Regular',
        fontSize: 16,
        color: 'white',
        width: '200',
    },

    botao:{
        backgroundColor: 'white',
        width: 200,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "black",
        shadowOffset: {
            width: 1.6,
            height: 1.6,
        },
        shadowOpacity: 0.10,
        elevation: 2
    },

    textoBotao:{
        fontFamily: 'PlaypenSans_700Bold',
        fontSize: 16,
        color: '#1696de',
    },

    h2:{
        fontFamily: 'PlaypenSans_400Regular',
        fontSize: 16,
        color: '#646464',
    },

    areaBotoesHome:{
        gap: 15,
    }

});

export default EstiloGeral;