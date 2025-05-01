import { StyleSheet } from "react-native";

const EstiloGeral = StyleSheet.create({

    body:{
        flex: 1,
        backgroundColor: '#fffaf5',
        alignItems: 'center',
        justifyContent: 'flex-start',  
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

    subHeader:{
        backgroundColor: 'rgba(106, 181, 77, 0.7)',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },

    conteudoSubHeader:{
        fontFamily: 'PlaypenSans_400Regular',
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
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
        display: 'flex',
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
        marginTop: 10,
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
    },

    containerInputsGeral:{
        width: '100%',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    inputContainer:{
        width:'80%',
    },

    label:{
        fontFamily: 'PlaypenSans_700Bold',
        fontSize: 16,
        color: '#646464',
        marginBottom: 5,
    },

    input:{
        fontFamily: 'PlaypenSans_400Regular',
        paddingLeft: 20,
        width: '100%',
        height: 50,
        borderRadius: 50,   
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#c8c8c8',
    },

    inputRadioContainer:{
        width:'80%',
        flexDirection: 'row',
        gap: 30,
    },

    inputRadio:{
        fontFamily: 'PlaypenSans_400Regular',
        fontSize: 16,
    }



});

export default EstiloGeral;