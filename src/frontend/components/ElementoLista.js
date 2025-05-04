import React from "react-native";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import EstiloGeral from "../app/EstiloGeral";
import { useRouter } from "expo-router";
import Botao from "./Botao";

function ElementoLista({data, titulos}) {

   const router = useRouter();

   return (
      <View style={{alignItems:"center"}}>
            <Image source={require('../assets/imgs/logo.png')} style={styles.img} />
         <View style={styles.card}>
            <Text style={EstiloGeral.cardH1}>
               {data.name}
            </Text>
            <View>
               <Text style={EstiloGeral.cardH2}>
                  {titulos[0]}
               </Text>
               <Text style={styles.texto}>
                     {data.cpf}
                  </Text>
            </View>
            <View>
               <Text style={EstiloGeral.cardH2}>
                  {titulos[1]}
               </Text>
               <Text style={styles.texto}>
                     {data.cidade}/{data.estado}
                  </Text>
            </View>
            <View>
               <Text style={EstiloGeral.cardH2}>
                  {titulos[2]}
               </Text>
               <Text style={styles.texto}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed cursus lacus. Morbi      sagittis nunc mi.
               </Text>
            </View>
         </View>
            <Botao texto={'Contatos'} corFundo="#1696de" corTexto="white" marginTop={10}/>
      </View>
   );
}

const styles = StyleSheet.create({
   card:{
      marginLeft:60,
      marginRight:20,
 
   },
   texto:{
      marginLeft:30,
      fontFamily: 'PlaypenSans_400Regular',
      fontSize:17
   },
   img:{
      width:150,
      height:150,
      borderRadius:75,
               

   }
})

export default ElementoLista;