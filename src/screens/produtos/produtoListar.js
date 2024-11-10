import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getData } from '../../components/ASComponent';

const ProdutoListar = ({ navigation }) => {
    const [produtos, setProdutos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const carregaProdutosDoBanco = async () => {
        setRefreshing(true);
        const bancoProdutos = await getData('produtos');
        
        if (bancoProdutos) {
            console.log(bancoProdutos);
            setProdutos(bancoProdutos);
        } else {
            console.log("Nada encontrado");
        }
        setRefreshing(false);
    };

    useEffect(() => {
        carregaProdutosDoBanco();
    }, []);

    const MostrarProdutos = ({ item }) => (
        <TouchableOpacity style={styles.bookItem}  
            onPress={() => navigation.navigate('produtoEditar', {produtos: item })}
           > <Text style={styles.bookTitle}>{item['Nome do Produto'] || "Título não disponível"}</Text>
            <Text style={styles.bookAuthor}>{item['Preço'] || "Preço não disponível"}</Text>
            <Text style={styles.bookAuthor}>{item['Descrição'] || "Descrição não disponível"}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.refreshButton}
                onPress={carregaProdutosDoBanco}
            >
                <Text style={styles.refreshButtonText}>
                    {refreshing ? 'Atualizando...' : 'Atualizar Produtos'}
                </Text>
            </TouchableOpacity>

            <FlatList
                data={produtos}
                renderItem={MostrarProdutos}
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
        backgroundColor: '#007BFF',
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

export default ProdutoListar;
