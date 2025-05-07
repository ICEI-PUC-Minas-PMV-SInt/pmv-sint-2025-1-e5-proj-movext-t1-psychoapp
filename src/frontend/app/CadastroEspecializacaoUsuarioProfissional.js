import { useEffect, useState } from "react";
import {StatusBar} from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { UseRoute, } from "expo-router";
import EstiloGeral from "./EstiloGeral";
import Header from "../components/Header";
import  SubHeader from "../components/SubHeader";
import InputRadio from "../components/InputRadio";
import Botao from "../components/Botao";
import Input from "../components/Input";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhotoInput from "../components/PhotoInput";

export default function CadastroEspecializacaoUsuarioProfissional() {

    const router = useRouter();
    
}