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
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },

    linkGoBack:{
        position: 'absolute',
        left: 15,
    },

    setaGoBack:{
        width: 35,
        height: 35,
    },

    linkHamburger:{
        position: 'absolute',
        right: 15,
    },

    hamburguer:{
        width: 28,
        height: 28,
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
        width: '220',
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
    },

    areaTeste:{
        width: '100%',
        backgroundColor: '#6ab54d',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50

    },

        textoCarregamento:{
        fontFamily: 'PlaypenSans_700Bold',
        fontSize: 16,
        color: '#1696de',
        marginTop: 15,
    },

    //LISTAGEM:

    listaContainer:{
        width: '75%',
        height: '100%',
    },

    itemNome:{
        fontFamily: 'PlaypenSans_700Bold',
        textAlign: 'center',
        fontSize: 26, // Ajustado
        color: '#1696de',
        marginBottom: 2, // Reduzido
    },

    itemIdade: { // Novo estilo para a idade
        fontFamily: 'PlaypenSans_700Bold',
        textAlign: 'center',
        fontSize: 22,
        color: '#1696de',
        marginBottom: 8,
    },

    itemDetalhe: { // Novo estilo para os outros detalhes do item
        fontFamily: 'PlaypenSans_400Regular',
        fontSize: 14,
        color: '#333', // Escurecido um pouco
        marginBottom: 4, // Aumentado um pouco
        textAlign: 'left', 
    },

    itemImagemLista: { 
        width: 90, // Aumentado
        height: 90, // Aumentado
        borderRadius: 45, // Metade da largura/altura para ser circular
        marginBottom: 12, // Aumentado
        alignSelf: 'center', 
        backgroundColor: '#e0e0e0', 
        borderWidth: 2, // Adicionada borda
        borderColor: '#1696de', // Cor da borda
    },

    itemLista: { 
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08, 
        shadowRadius: 4,
        elevation: 3,
        width: '100%', 
    },

    listaContainer: { 
        width: '90%', 
        marginTop: 20,
        alignSelf: 'center',
    },

    tituloSeçãoLista: { // Novo estilo para o título da seção (ex: "Pacientes Disponíveis:")
        fontSize: 18,
        fontFamily: 'PlaypenSans_600SemiBold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },

    textoListaVazia: { // Novo estilo para texto de lista vazia
        marginTop: 30,
        fontSize: 16,
        fontFamily: 'PlaypenSans_400Regular',
        color: '#666',
        textAlign: 'center',
    },

    imgPerfil:{
        width: 200,
        height: 200,
        borderRadius: 300,
        alignSelf: 'center',
        marginBottom: 10,
    },

    itemLista:{
        alignItems: 'center',
    },

    dadosItemLista:{
        width: '80%',
    },

    tituloDadoLista:{
        fontFamily: 'PlaypenSans_700Bold',
        fontSize: 18,
        color: '#6ab54d',
        marginBottom: 2,
    },

    conteudoDadoLista:{
        fontFamily: 'PlaypenSans_400Regular',
        fontSize: 16,
        color: '#646464',
    },

    containerIconeLista:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    }






});

export default EstiloGeral;