import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Header from '../../components/HeaderComponent';

const headerTitle = "Trânsito";

const PlacaDetalhada = ({ route, navigation }) => {
    const { placa } = route.params;

    // Define a função handleShowSection para os botões do cabeçalho
    const handleShowSection = (section) => {
        if (section === 'Form') {
            navigation.navigate('FormScreen');
        } else if (section === 'Historico') {
            navigation.navigate('HistoricoScreen');
        }
    };

    // Definição dos itens do cabeçalho com a função handleShowSection agora acessível
    const headerItems = [
        ['Form', 'button', () => handleShowSection('Form')],
        ['Historico', 'button', () => handleShowSection('Historico')],
    ];

    const goToEditScreen = () => {
        navigation.navigate('placaEditar', { placa });
    };

    // const goToDeleteScreen = () => {
    //     navigation.navigate('placaExcluir', { placa });
    // };

    return (
        <View style={styles.appContainer}>
            <Header title={headerTitle} items={headerItems} />
            <View style={styles.container}>
                <Text style={styles.title}>Detalhes da Placa</Text>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Placa:</Text>
                    <Text style={styles.infoText}>{placa.placas}</Text>
                </View>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Proprietário:</Text>
                    <Text style={styles.infoText}>{placa.proprietario}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Modelo ID:</Text>
                    <Text style={styles.infoText}>{placa.modelo_id}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Marca ID:</Text>
                    <Text style={styles.infoText}>{placa.marca_id}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Combustível ID:</Text>
                    <Text style={styles.infoText}>{placa.combustivel_id}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Ano:</Text>
                    <Text style={styles.infoText}>{placa.ano}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Renavam:</Text>
                    <Text style={styles.infoText}>{placa.renavam}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Chassi:</Text>
                    <Text style={styles.infoText}>{placa.chassi}</Text>
                </View>
                
                <Button title="Editar" onPress={goToEditScreen} color="#007BFF" />
                {/* <Button title="Excluir" onPress={goToDeleteScreen} color="#FF0000" /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        width: 100,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        flex: 1,
    },
});

export default PlacaDetalhada;
