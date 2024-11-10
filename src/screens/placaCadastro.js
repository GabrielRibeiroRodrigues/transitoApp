import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import FormComponent from '../components/FormComponent';
import { saveData } from '../components/ASComponent';

const fields = [
    ['text', 'Placa'],
    ['text', 'Proprietario'],
    ['text', 'Modelo'],
    ['text', 'Marca'],
    ['text', 'Cor'],
    ['text', 'Ano'],
    ['text', 'Combustivel'],
    ['text', 'Renavam'],
    ['text', 'Chassi'],
];

const PlacaCadastro = ({ navigation }) => {
    const [placas, setPlacas] = useState([]);

    const addPlacasBanco = async (formData) => {
        setPlacas((prev) => [...prev, formData]);
        await saveData('placas', formData);
    };

    const handleSubmit = (formData) => {
        console.log('Valores do Formulário Recebidos:', formData);
        addPlacasBanco(formData);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Text style={styles.title}>Cadastro de Placas</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <FormComponent fields={fields} onSubmit={handleSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },
});

export default PlacaCadastro;
