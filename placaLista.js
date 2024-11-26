import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../components/HeaderComponent';
import sqlite from '../../components/SQliteComponent';
import SQLComponent from '../../components/SQLComponent';
import DataTable from '../../components/ListDataComponent';

const headerTitle = "Trânsito";

const headerItems = [
    ['Home', 'button', (navigation) => navigation.navigate('HomeTransito')],
    ['Registrar', 'button', (navigation) => navigation.navigate('PlacaCadastro')],
];

const PlacaLista = ({ navigation }) => {
    const [foreignKeyValor, setForeignKeyValues] = useState({});

const carregaPlacasDoBanco = async () => {
        const registros = await sqlite.getAllRecords('myDatabase.db', 'Veiculos');
        console.log(registros);
    };

useEffect(() => {
        carregaPlacasDoBanco();
        carregaForeignKeys(fk, setForeignKeyValues);
    }, []);
    
   const fk = {
        marca_id : {
            databaseName: "myDatabase.db",
            tableName: "Marca",
            fieldName: "id",
            displayField: "marca",
        },
        modelo_id : {
            databaseName: "myDatabase.db",
            tableName: "Modelo",
            fieldName: "id",
            displayField: "modelo",
        },
        cor_id : {
            databaseName: "myDatabase.db",
            tableName: "Cor",
            fieldName: "id",
            displayField: "cor",
        },
        combustivel_id : {
            databaseName: "myDatabase.db",
            tableName: "Combustivel",
            fieldName: "id",
            displayField: "combustivel",
        },}
    

    const carregaForeignKeys = async (fk, setValues) => {
        const results = {};
        try {
            for (const key in fk) {
                const { databaseName, tableName, displayField } = fk[key];
                const registros = await SQLComponent.getAllRecords(databaseName, tableName);
                results[key] = registros.map(registro => registro[displayField]);
            }
            setValues(results);
        } catch (error) {
            console.error("Erro ao carregar chaves estrangeiras:", error);
        }
    };
    console.log("testeee", foreignKeyValor.marca_id);
    return (
        <View style={styles.appContainer}>
            <Header title={headerTitle} items={headerItems} />
            <View style={styles.container}>
                 <DataTable
            databaseName="myDatabase.db"
            tableName="Veiculos"
            fields={['placas', 'proprietario', 'marca_id','modelo_id']}
            campos = {[]}
            edicao = {0}
            ocultar={['id','modelo_id']}
          />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    appContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
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
    recordButton: {
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
    recordText: {
        fontSize: 16,
    },
});

export default PlacaLista;