import { useState, useEffect } from 'react'; // Removido 'use' que não estava sendo utilizado
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native'; // Adicionado ActivityIndicator
import { useRouter } from 'expo-router';
import EstiloGeral from './EstiloGeral';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function calcularIdade(dataNascimentoStr) {
    if (!dataNascimentoStr) return null;
    const dataNasc = new Date(dataNascimentoStr);
    if (isNaN(dataNasc)) return null;
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const m = hoje.getMonth() - dataNasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }
    return idade;
}

export default function Listar() {
    const router = useRouter();

    const [tipoPerfil, setTipoPerfil] = useState('');
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [dadosLista, setDadosLista] = useState([]); // Inicializado como array vazio
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

    // Efeito para carregar dados iniciais do usuário (perfil, nome, token)
    useEffect(() => {
        async function carregarDadosIniciaisUsuario() {
            try {
                const perfilStorage = await AsyncStorage.getItem('tipoPerfil');
                const nomeStorage = await AsyncStorage.getItem('name');
                const tokenStorage = await AsyncStorage.getItem('tokenjwt');

                if (perfilStorage) setTipoPerfil(perfilStorage);
                if (nomeStorage) setName(nomeStorage.split(' ')[0]); else setName('');
                if (tokenStorage) setToken(tokenStorage);

                if (!tokenStorage || !perfilStorage) {
                    Alert.alert("Atenção", "Dados de login não encontrados. Por favor, faça login novamente.");
                    router.replace('/Login');
                }
            } catch (error) {
                console.error("Erro ao carregar dados iniciais do usuário:", error);
                Alert.alert("Erro", "Não foi possível carregar seus dados.");
                router.replace('/Login');
            }
        }
        carregarDadosIniciaisUsuario();
    }, [router]);

    // Efeito para buscar dados do backend DEPOIS que token e tipoPerfil estiverem definidos
    useEffect(() => {

        async function reqBackend() {
            if (!token || !tipoPerfil) { // Só executa se token e tipoPerfil existirem
                setLoading(false); // Para o loading se não houver token/perfil para buscar
                return;
            }

            setLoading(true);
            let endpoint = '';
            if (tipoPerfil === 'psicopedagogo') {
                endpoint = '/list-pacientes';
            } else if (tipoPerfil === 'paciente') {
                endpoint = '/list-profissionais'; // Assumindo que este é o endpoint para pacientes listarem profissionais
            } else {
                setLoading(false);
                return; // Tipo de perfil não suportado para listagem
            }

            try {
                const resApi = await api.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Removido 'Content-Type': 'multipart/form-data' para GET
                    },
                });
                setDadosLista(resApi.data); // Garante que seja um array
            } catch (e) {
                console.error("Erro ao buscar lista do backend:", e.response?.data || e.message);
                Alert.alert("Erro", `Erro de conexão com o servidor: ${e.response?.data?.message || e.message}`);

            } finally {
                setLoading(false);
            }
        }

        reqBackend();
    }, [token, tipoPerfil, router]); // Dependências: token e tipoPerfil

    const tituloSubHeaderDinamico = tipoPerfil === 'psicopedagogo' ? 'pacientes' : 'psicopedagogos';

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Image source={require('../assets/imgs/logo.png')} style={EstiloGeral.logo}/>
                <ActivityIndicator size="large" color="#1696de" style={{marginTop:25}} />
                <Text style={EstiloGeral.textoCarregamento}>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
        >
            <StatusBar style="auto" />
            <Header titulo={`Bem-vindo(a)\n${name}!`} imageSourceProp={true}/>
            <SubHeader conteudo={`Conheça novos ${tituloSubHeaderDinamico}\npara atendimento.`} />

            {/* ÁREA DINÂMICA EM RELAÇÃO O TIPO DE PERFIL */}
            {tipoPerfil === 'psicopedagogo' && dadosLista.length > 0 && (

                <View style={EstiloGeral.listaContainer}>

                    {dadosLista.map((item) => (
                      
                      
                        <View key={item.id || item.usuarioId} style={EstiloGeral.itemLista}>

                            <Image source={{ uri: `https://drive.google.com/uc?export=view&id=${item.paciente.profileimg}` }}  style={EstiloGeral.imgPerfil}/>

                            <Text style={EstiloGeral.itemNome}>{item.name || item.usuario?.name}</Text>

                            <Text style={EstiloGeral.itemIdade}>
                              {calcularIdade(item.dataNascimento) !== null ? `${calcularIdade(item.dataNascimento)} anos` : ''}
                            </Text>

                            <View style={EstiloGeral.dadosItemLista}>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-email.png')} style={{width:30, height:21.5}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Email: </Text>
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.email || item.usuario?.email}</Text>

                              <Text>{'\n'}</Text>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-telefone.png')} style={{width:30, height:30}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Telefone: </Text>
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.telefone || item.usuario?.telefone}</Text>

                                                            <Text>{'\n'}</Text>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-local.png')} style={{width:19.6, height:30}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Cidade: </Text>
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.cidade || item.usuario?.cidade} / {item.estado || item.usuario?.estado}</Text>

                                                            <Text>{'\n'}</Text>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-modalidade.png')} style={{width:30, height:30}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Modalidade:</Text>
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.paciente.necessidadeAtendimento}</Text>

                                                            <Text>{'\n'}</Text>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-lupa.png')} style={{width:30, height:30}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Diagnóstico:</Text>
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.paciente.diagnostico ? 'Sim' : 'Não'}</Text>
                              {item.paciente.diagnostico && <Text style={EstiloGeral.conteudoDadoLista}>{item.paciente.qualDiagnostico}</Text>}

                                                            <Text>{'\n'}</Text>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-encaminhamento.png')} style={{width:30, height:30}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Encaminhamento: </Text> 
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.paciente.encaminhamento}</Text>

                                                            <Text>{'\n'}</Text>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-queixas.png')} style={{width:24, height:30}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Queixas:</Text> 
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.paciente.queixas}</Text>

                              <Text>{'\n'}</Text>

                            </View>


                        </View>
                    ))}
                </View>
            )}






            {tipoPerfil === 'paciente' && dadosLista.length > 0 && (

                <View style={EstiloGeral.listaContainer}>

                    {dadosLista.map((item) => (
                      
                      
                        <View key={item.id || item.usuarioId} style={EstiloGeral.itemLista}>

                            <Image source={{ uri: `https://drive.google.com/uc?export=view&id=${item.profissional.profileimg}` }}  style={EstiloGeral.imgPerfil}/>

                            <Text style={EstiloGeral.itemNome}>{item.name || item.usuario?.name}</Text>

                            <Text style={EstiloGeral.itemIdade}>
                              {calcularIdade(item.dataNascimento) !== null ? `${calcularIdade(item.dataNascimento)} anos` : ''}
                            </Text>

                            <View style={EstiloGeral.dadosItemLista}>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-email.png')} style={{width:30, height:21.5}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Email: </Text>
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.email || item.usuario?.email}</Text>

                              <Text>{'\n'}</Text>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-telefone.png')} style={{width:30, height:30}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Telefone: </Text>
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.telefone || item.usuario?.telefone}</Text>

                                                            <Text>{'\n'}</Text>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-local.png')} style={{width:19.6, height:30}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Cidade: </Text>
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.cidade || item.usuario?.cidade} / {item.estado || item.usuario?.estado}</Text>

                                                            <Text>{'\n'}</Text>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-modalidade.png')} style={{width:30, height:30}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Modalidade:</Text>
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.profissional.tipoAtendimento}</Text>

                                                            <Text>{'\n'}</Text>

                              <View style={EstiloGeral.containerIconeLista}>
                                <Image source={require('../assets/imgs/icone-queixas.png')} style={{width:20, height:20}}/>
                                <Text style={EstiloGeral.tituloDadoLista}>Trajetória profissional:</Text>
                              </View>

                              <Text style={EstiloGeral.conteudoDadoLista}>{item.profissional.trajetoriaProfissional}</Text>

                              <Text>{'\n'}</Text>

                            </View>


                        </View>
                    ))}
                </View>
            )}

            {!loading && dadosLista.length === 0 && (
                <Text style={styles.emptyListText}>Nenhum {tituloSubHeaderDinamico} encontrado no momento.</Text>
            )}
            <View style={{ height: 50 }}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fffaf5',
    },
    contentContainer: {
        alignItems: 'center',
        // paddingBottom: 40, // Adicionado padding para melhor visualização
        flexGrow: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffaf5',
    },
    // listContainer: {
    //     width: '90%',
    //     marginTop: 20,
    // },
    // sectionTitle: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    //     color: '#333',
    // },
    // listItem: {
    //     backgroundColor: '#fff',
    //     padding: 15,
    //     borderRadius: 8,
    //     marginBottom: 10,
    //     borderWidth: 1,
    //     borderColor: '#ddd',
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 1 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 2,
    //     elevation: 2,
    // },
    // itemName: {
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     marginBottom: 5,
    // },
    // emptyListText: {
    //     marginTop: 30,
    //     fontSize: 16,
    //     color: '#666',
    // }
});