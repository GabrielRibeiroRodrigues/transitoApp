import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import FormComponent from '../../components/FormComponent';
import Header from '../../components/HeaderComponent';
import SQLComponent from '../../components/SQLComponent';
import sqlite from '../../components/SQliteComponent';
const headerTitle = "Trânsito";
const headerItems = [
    ['Teste', 'button', () => handleShowSection('Form')],
    ['Teste2', 'button', () => handleShowSection('Historico')],
];

// const handledelete= async () => {
//     try {
//         await sqlite.deleteRecord('myDatabase.db', 'Cor', 'cor', 'Azul Marinho');
//         console.log('Registro Deletado com sucesso!');
        
//     } catch (error) {
//         console.error('Erro ao Deletar :', error);
//     }
// };
// handledelete();

// const deletarTabela= async () => {
//     try {
//         await sqlite.deleteTable('myDatabase.db', 'Modelo');
//         console.log('Marca Deletado com sucesso!');
        
//     } catch (error) {
//         console.error('Erro ao Deletar Tabela :', error);
//     }
// };
// deletarTabela();

const fields = [
    ['text', 'Placa'],
    ['text', 'Proprietario'],
    ['picker', 'Marca', []],  
    ['picker', 'Modelo', []], 
    ['picker', 'Cor', []],
    ['text', 'Ano'],
    ['picker', 'Combustivel',[]],
    ['text', 'Renavam'],
    ['text', 'Chassi'],
];

const PlacaCadastro = ({ navigation }) => {
    const [placas, setPlacas] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [cores, setCores] = useState([]);
    const [combustivel, setCombustivel] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const initializeDatabase = async () => {
        await createVeiculoTable();
        await createMarcaTable();
        await createModeloTable();
        await createCorTable();
        await createCombustivelTable();
    };
const banco = 'myDatabase.db';
const addPlacasBanco = async (formData) => {
        const { Proprietario, Placa, Marca, Modelo, Cor, Ano, Combustivel, Renavam, Chassi } = formData;

        await SQLComponent.insertRecord('myDatabase.db', 'Veiculos', { 
            proprietario: Proprietario,
            placas: Placa,
            marca_id: Marca,
            modelo_id: Modelo,
            cor_id: Cor,
            ano: Ano,
            combustivel_id: Combustivel,
            renavam: Renavam,
            chassi: Chassi,
        });
        carregaPlacaDoBanco();
    };

const carregaPlacaDoBanco = async () => {
        const registros = await SQLComponent.getAllRecords('myDatabase.db', 'Veiculos'); 
        setPlacas(registros);
    };

const handleSubmit = (formData) => {
        addPlacasBanco(formData);
    };

useEffect(() => {
        initializeDatabase();
        carregaPlacaDoBanco();
        carregaMarcaDoBanco(setMarcas);  
        carregaModeloDoBanco(setModelos);
        carregaCorDoBanco(setCores);  
        carregaCombustivelDoBanco(setCombustivel);  // Atualiza os combustiveis no estado
    //    addNovoCombustivelBanco('FLEX', setCombustivel); // Atualiza)
    //    addNovaCorBanco('Azul', setCores)// Atualiza os modelos no estado
    //    addModeloBanco('KA', setModelos); // Atualiza os modelos no estado
    //     addMarcaBanco('Vermemlho', setMarcas); // Atualiza
    }, []);
 
    // fields[2][2] = marcas;  
    // fields[3][2] = modelos;   
    // fields[4][2] = cores;
    // fields[6][2] = combustivel;
    
return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Header title={headerTitle} items={headerItems} />
            <Text style={styles.title}>Registro de Veículos</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <FormComponent database = {banco} tabelas = {['Veiculos']}  fields={[]} onSubmit={handleSubmit} initialData={{}} edicao = {false}/>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const createVeiculoTable = async () => {
    try {
        await SQLComponent.createTable('myDatabase.db', 'Veiculos', [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'proprietario', type: 'TEXT' },
            { name: 'placas', type: 'TEXT' },
            { name: 'modelo_id', type: 'INTEGER', foreignKey: { table: 'Modelo', column: 'id' } },
            { name: 'marca_id', type: 'INTEGER', foreignKey: { table: 'Marca', column: 'id' } },
            { name: 'cor_id', type: 'INTEGER', foreignKey: { table: 'Cor', column: 'id' }},
            { name: 'Ano', type: 'INTEGER' },
            { name: 'combustivel_id', type: 'INTEGER', foreignKey: { table: 'Combustivel', column: 'id' }},
            { name: 'renavam', type: 'TEXT' },
            { name: 'chassi', type: 'TEXT' },
        ]);
    } catch (error) {
        console.error('Erro ao criar a tabela "Veiculos":', error);
    }
};
const createModeloTable = async () => {
    try {
        await SQLComponent.createTable('myDatabase.db', 'Modelo', [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'modelo', type: 'TEXT' },
        ]);
    } catch (error) {
        console.error('Erro ao criar a tabela "Modelo":', error);
    }
};
const carregaModeloDoBanco = async (setModelos) => {
    try {
        const modelo = await SQLComponent.getAllRecords('myDatabase.db', 'Modelo');
        const ModeloNames = modelo.map(modelo => modelo.modelo); 
        setModelos(ModeloNames); 
        console.log("Modelos carregados:", ModeloNames);
    } catch (error) {
        console.error("Erro ao carregar modelos:", error);
    }
};
const addModeloBanco = async (modelo, setModelos) => {
    try {
        await SQLComponent.insertRecord('myDatabase.db', 'Modelo', { 
            modelo: modelo
        });
        // Atualiza os modelos após a inserção
        carregaModeloDoBanco(setModelos);
    } catch (error) {
        console.error("Erro ao inserir o Modelo:", error);
    }
};
const createMarcaTable = async () => {
    try {
        await SQLComponent.createTable('myDatabase.db', 'Marca', [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'marca', type: 'TEXT' },
        ]);
    } catch (error) {
        console.error('Erro ao criar a tabela "Marca":', error);
    }
};
const addMarcaBanco = async (marca, setMarcas) => {
    try {
        await SQLComponent.insertRecord('myDatabase.db', 'Marca', { 
            marca: marca
        });   
        carregaMarcaDoBanco(setMarcas);
    } catch (error) {
        console.error("Erro ao inserir a marca:", error);
    }
};
const carregaMarcaDoBanco = async (setMarcas) => {
    try {
        const marcas = await SQLComponent.getAllRecords('myDatabase.db', 'Marca');
        const marcasNames = marcas.map(marca => marca.marca); // Extraímos apenas os nomes das marcas
        setMarcas(marcasNames); // Atualiza o estado com as marcas obtidas do banco
        console.log("Marcas carregadas:", marcasNames);
    } catch (error) {
        console.error("Erro ao buscar marcas:", error);
    }
};
const createCorTable = async () => {
    try {
        await SQLComponent.createTable('myDatabase.db', 'Cor', [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'cor', type: 'TEXT' },
        ]);
    } catch (error) {
        console.error('Erro ao criar a tabela "Cor":', error);
    }}
const carregaCorDoBanco = async (setCores) => {
        try {
            const cor = await SQLComponent.getAllRecords('myDatabase.db', 'Cor');
            const CorNames = cor.map(cor => cor.cor); 
            setCores(CorNames); 
            console.log("Cores carregadas:", CorNames);
        } catch (error) {
            console.error("Erro ao carregar Cores:", error);
        }
    };
const addNovaCorBanco = async (cor, setCores) => {
        try {
            await SQLComponent.insertRecord('myDatabase.db', 'Cor', { 
                cor: cor
            });    
            carregaCorDoBanco(setCores);
        } catch (error) {
            console.error("Erro ao inserir a Cor:", error);
        }
    };
const createCombustivelTable = async () => {
        try {
            await SQLComponent.createTable('myDatabase.db', 'Combustivel', [
                { name: 'id', type: 'INTEGER', primaryKey: true },
                { name: 'combustivel', type: 'TEXT' },
            ]);
        } catch (error) {
            console.error('Erro ao criar a tabela "combustivel":', error);
        }}
const carregaCombustivelDoBanco = async (setCombustivel) => {
            try {
                const combustivel = await SQLComponent.getAllRecords('myDatabase.db', 'Combustivel');
                const CombustivelNames = combustivel.map(combustivel => combustivel.combustivel);  
                setCombustivel(CombustivelNames); 
                console.log("Combustiveis carregadas:", CombustivelNames);
            } catch (error) {
                console.error("Erro ao carregar Combustiveis:", error);
            }
        };
const addNovoCombustivelBanco = async (combustivel, setCombustivel) => {
            try {
                await SQLComponent.insertRecord('myDatabase.db', 'Combustivel', { 
                    combustivel: combustivel
                });
 
                carregaCombustivelDoBanco(setCombustivel);
            } catch (error) {
                console.error("Erro ao inserir a Combustivel:", error);
            }
        };
const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
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
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
    },
    // scrollContainer: {
    //     paddingHorizontal: 16,
    //     paddingBottom: 30,
    // },
    // record: {
    //     marginBottom: 10,
    //     padding: 10,
    //     backgroundColor: '#e0e0e0',
    //     borderRadius: 5,
    // },
});
export default PlacaCadastro;
