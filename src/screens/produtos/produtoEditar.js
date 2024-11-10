import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { saveData, getData } from '../../components/ASComponent';

const ProdutoEditar = ({ route, navigation }) => {
    const { produtos } = route.params; // Recebe os dados do produto a ser editado

    const [title, setTitle] = useState(produtos['Nome do Produto']); 
    const [price, setPrice] = useState(produtos.Price); // Corrige o erro de referência

    // Função para salvar as alterações
    const handleSave = async () => {
        const updatedProduto = { ...produtos, 'Nome do Produto': title, Price: price }; // Atualiza os dados do produto
        
        const existingData = await getData('produtos'); // Obtém os dados existentes

        // Verifica se o produto já existe e atualiza ou adiciona
        const updatedData = existingData.map(item =>
            item['Nome do Produto'] === updatedProduto['Nome do Produto'] ? updatedProduto : item
        );

        // Se o produto não estiver presente, adiciona-o ao array
        if (!existingData.some(item => item['Nome do Produto'] === updatedProduto['Nome do Produto'])) {
            updatedData.push(updatedProduto);
        }
        
        await saveData('produtos', updatedData); // Salva os dados com a chave correta
        navigation.goBack(); // Retorna à tela anterior
    };

    // Função para excluir o produto
    const handleDelete = async () => {
        const existingData = await getData('produtos');
        const updatedData = existingData.filter(item => item['Nome do Produto'] !== produtos['Nome do Produto']);
        await saveData('produtos', updatedData);
        navigation.goBack(); // Retorna à tela anterior
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome do Produto"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Preço"
                value={price}
                onChangeText={setPrice}
                style={styles.input}
            />
            <Button title="Salvar" onPress={handleSave} />
            <Button title="Excluir" onPress={handleDelete} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
});

export default ProdutoEditar;
