import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Button, FlatList } from 'react-native';
import SQLComponent from '../../components/SQLComponent'; 

const PlacaExcluir = ({ navigation }) => {
    const [placas, setPlacas] = useState([]);

    // Função para buscar as placas do banco de dados
    const fetchPlacas = async () => {
        const registros = await SQLComponent.getAllRecords('myDatabase.db', 'Veiculos');
        console.log("Placas no banco:", registros);
        setPlacas(registros);
    };

    // Função para excluir um registro de placa
    const deletePlaca = async (placaId) => {
        try {
            await SQLComponent.deleteRecord('myDatabase.db', 'Veiculos', 'id', placaId);
            console.log(`Placa com id ${placaId} excluída com sucesso!`);
            fetchPlacas(); // Atualiza a lista de placas após a exclusão
        } catch (error) {
            console.error('Erro ao excluir a placa:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir a placa.');
        }
    };

    // Função chamada ao clicar no botão de excluir
    const handleDelete = (placaId) => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir esta placa?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    onPress: () => deletePlaca(placaId),
                },
            ]
        );
    };

    // useEffect para carregar as placas ao montar o componente
    useEffect(() => {
        fetchPlacas(); // Carrega as placas assim que o componente for montado
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Excluir Placas</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <FlatList
                    data={placas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.record}>
                            <Text style={styles.recordText}>{`Placa: ${item.placas}`}</Text>
                            <Button 
                                title="Excluir" 
                                color="red" 
                                onPress={() => handleDelete(item.id)} 
                            />
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
    },
    scrollContainer: {
        paddingBottom: 30,
    },
    record: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    recordText: {
        fontSize: 16,
        color: '#333',
    },
});

export default PlacaExcluir;
