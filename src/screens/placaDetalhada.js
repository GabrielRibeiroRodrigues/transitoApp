import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const PlacaDetalhada = ({ route }) => {
    const { placa } = route.params;  

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <Text style={styles.title}>Detalhes da Placa</Text>
               

                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Placa:</Text>
                    <Text style={styles.detailValue}>{placa['Placa']}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Proprietário:</Text>
                    <Text style={styles.detailValue}>{placa['Proprietario']}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Modelo:</Text>
                    <Text style={styles.detailValue}>{placa['Modelo']}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Marca:</Text>
                    <Text style={styles.detailValue}>{placa['Marca']}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Cor:</Text>
                    <Text style={styles.detailValue}>{placa['Cor']}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Ano:</Text>
                    <Text style={styles.detailValue}>{placa['Ano']}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Combustível:</Text>
                    <Text style={styles.detailValue}>{placa['Combustivel']}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Renavam:</Text>
                    <Text style={styles.detailValue}>{placa['Renavam']}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Chassi:</Text>
                    <Text style={styles.detailValue}>{placa['Chassi']}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    detailsContainer: {
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    vehicleImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    detailItem: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        elevation: 2, 
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    detailValue: {
        fontSize: 16,
        color: '#555',
        marginTop: 8,
    },
});

export default PlacaDetalhada;
