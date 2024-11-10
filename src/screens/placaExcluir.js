import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { getData } from '../components/ASComponent';

const PlacaExcluir = ({ navigation }) => {
    const [placas, setPlacas] = useState([]);
    const [filteredPlacas, setFilteredPlacas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    // Carregar placas do banco de dados
    const carregaPlacasDoBanco = async () => {
        setRefreshing(true);
        const bancoPlaca = await getData('placas');
        
        if (bancoPlaca) {
            console.log(bancoPlaca);
            setPlacas(bancoPlaca);
            setFilteredPlacas(bancoPlaca); // Inicializa a lista filtrada com todas as placas
        } else {
            console.log("Nada encontrado");
        }
        setRefreshing(false);
    };

    // Executado na primeira renderização
    useEffect(() => {
        carregaPlacasDoBanco();
    }, []);

    // Função para filtrar placas com base na pesquisa
    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text) {
            const filtered = placas.filter(item =>
                item['Placa'].toLowerCase().includes(text.toLowerCase())
            );
            setFilteredPlacas(filtered);
        } else {
            setFilteredPlacas(placas); 
        }
    };


    const MostrarPlacas = ({ item }) => (
        <TouchableOpacity style={styles.bookItem}  
            onPress={() => navigation.navigate('placaDetalhada', {placa : item })}
        >
            <Text style={styles.bookTitle}>{item['Placa']}</Text>
            <Text style={styles.bookAuthor}>{item['Proprietario']}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>


            <TouchableOpacity
                style={styles.refreshButton}
                onPress={carregaPlacasDoBanco}
            >
                <Text style={styles.refreshButtonText}>
                    {refreshing ? 'Deletando...' : 'Deletar Placa'}
                </Text>

            </TouchableOpacity>




            <TextInput
                style={styles.searchInput}
                placeholder="Buscar Placa..."
                value={searchQuery}
                onChangeText={handleSearch}
            />

            <FlatList
                data={filteredPlacas}
                renderItem={MostrarPlacas}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 16,
    },
    bookItem: {
        marginVertical: 8,
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bookAuthor: {
        fontSize: 16,
        color: '#555',
    },
    refreshButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    refreshButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PlacaExcluir;
