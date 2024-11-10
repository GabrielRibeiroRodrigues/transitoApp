    import React, { useState } from 'react';
    import { View, StyleSheet } from 'react-native';
    import FormComponent from '../../components/FormComponent';
    import { saveData } from '../../components/ASComponent';

    const fields = [
        ['text', 'Nome do Produto'],
        ['text', 'Preço'],
        ['textarea', 'Descrição'],
        
    ];

    const ProdutoCriar = ({ navigation }) => {
        const [produtos, setProdutos] = useState([]);

        const addProdutoNoBanco = async (formData) => {
                setProdutos((prev) => [...prev, formData]);
                await saveData('produtos', formData);      
        };

        const handleSubmit = (formData) => {
            console.log('Valores do Formulário Recebidos:', formData);
            addProdutoNoBanco(formData);
        };

        return (    
            <View style={styles.container}>
                <FormComponent fields={fields} onSubmit={handleSubmit} />
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        title: {
            fontSize: 24,
            marginBottom: 50,
        },
    });

    export default ProdutoCriar;
