import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sistema de Trânsito</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('placaCadastro')}
            >
                <Text style={styles.buttonText}>Cadastrar Placa</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('placaLista')}
            >
                <Text style={styles.buttonText}>Lista de Placas Cadastradas</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('placaExcluir')}
            >
                <Text style={styles.buttonText}>Deletar Placa</Text>
            </TouchableOpacity>

            {/* Botões comentados mantidos conforme solicitado */}
            {/* 
            <Button
                title="Produtos"
                onPress={() => navigation.navigate('produtoGeral')}
            />
            <Button
                title="Clientes"
                onPress={() => navigation.navigate('Produto')}
            />
            <Button
                title="Pedido"
                onPress={() => navigation.navigate('Produto')}
            />
            <Button
                title="Contato"
                onPress={() => navigation.navigate('Produto')}
            />
            <Button
                title="Sobre"
                onPress={() => navigation.navigate('Produto')}
            /> 
            */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        marginBottom: 50,
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
