
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../../components/HeaderComponent';
import SQLComponent from '../../components/SQliteComponent';
// import sq from '../../components/SQLComponent';
import sq from '../../components/SQliteComponent';
const headerTitle = "Trânsito";
const headerItems = [
    ['Home', 'HomeTransito'],
    ['Registro de Veículos', 'placaCadastro'],
    ['Registro de Motorista', 'motoristaRegistro'],
    ['Lista de Veículos', 'placaLista'],
];
const headerColor = '#0051ff';
const HomeScreen = ({ navigation }) => {
        const [placas, setPlacas] = useState([]);
        const [marcas, setMarcas] = useState([]);
        const [modelos, setModelos] = useState([]);
        const [cores, setCores] = useState([]);
        const [combustivel, setCombustivel] = useState([]);
        const [motoristas, setMotoristas] = useState([]);
    const initializeDatabase = async () => {
        await createVeiculoTable();
        await createMarcaTable();
        await createModeloTable();
        await createCorTable();
        await createCombustivelTable();
        await createMotoristaTable();
        await createVeiculoMotorista(); //
       
    };

const addPlacasBanco = async (formData) => {
        const { Proprietario, Placa, Marca, Modelo, Cor, Ano, Combustivel, Renavam, Chassi } = formData;
    
        try {
            await SQLComponent.insertRecord('transito.db', 'Veiculos', { 
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
            console.log('Dados inseridos com sucesso, ID do veículo:', idVeiculo);
            return idVeiculo;
            carregaPlacaDoBanco();
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
        }
    };
const carregaPlacaDoBanco = async () => {
        const registros = await SQLComponent.getRecords('transito.db', 'Veiculos'); 
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
       carregaMotoristaDoBanco(setMotoristas);
    //     addNovoCombustivelBanco('Gasolina', setCombustivel); // Atualiza)
    //    addNovaCorBanco('Branco', setCores)// Atualiza os modelos no estado
        //    addModeloBanco('KA', setModelos); // Atualiza os modelos no estado
        //    addModeloBanco('Onix', setModelos); // Atualiza os modelos no estado
        //    addModeloBanco('RAM', setModelos); // Atualiza os modelos no estado
    //     addMarcaBanco('Toyota', setMarcas); // Atualiza
    // addMotoristaBanco(
    //     { nome: 'Paulo Santos', cpf: '1234567890' },
    //     setMotoristas
    // );
    //    addMotoristaBanco(
    //     { nome: ' Santos', cpf: '1234567890' },
    //     setMotoristas
    // );
    //    addMotoristaBanco(
    //     { nome: ' Santos', cpf: '1234567890' },
    //     setMotoristas
    // );
    //    addMotoristaBanco(
    //     { nome: ' Santos', cpf: '1234567890' },
    //     setMotoristas
    // );
    


    }, []);
    const createVeiculoTable = async () => {
        try {
            await SQLComponent.createTable('transito.db', 'Veiculos', [
                { name: 'id', type: 'INTEGER', primaryKey: true },
                { name: 'placas', type: 'TEXT' },
                { name: 'multi_modelo_id', type: 'INTEGER', foreignKey: { table: 'Modelo', column: 'id' } },
                { name: 'modelo_id', type: 'INTEGER', foreignKey: { table: 'Modelo', column: 'id' } },
                { name: 'cor_id', type: 'INTEGER', foreignKey: { table: 'Cor', column: 'id' }},
                { name: 'ano', type: 'INTEGER' },
                { name: 'combustivel_id', type: 'INTEGER', foreignKey: { table: 'Combustivel', column: 'id' }},
                { name: 'renavam', type: 'TEXT' },
                { name: 'chassi', type: 'TEXT' },
            ]);
        } catch (error) {
            console.error('Erro ao criar a tabela "Veiculos":', error);
        }
    };
    const createVeiculoMotorista = async () => {
        try {
            await SQLComponent.createTable('transito.db', 'VeiculoMotorista',[
                { name: 'id', type: 'INTEGER', primaryKey: true },
                { name: 'Veiculos_id', type: 'INTEGER', foreignKey: { table: 'Veiculos', column: 'id' }},
                { name: 'multi_motorista', type: 'INTEGER', foreignKey: { table: 'Motorista', column: 'id' }},
               
                { name: 'Motorista_id', type: 'INTEGER', foreignKey: { table: 'Motorista', column: 'id' }},
                { name: 'radio_radio_teste3', type: 'TEXT' },
            ]);
        } catch (error) {
            console.error('Erro ao criar a tabela "VeiculoMotorista":', error);
        }
    };
    
    const createModeloTable = async () => {
        try {
            await SQLComponent.createTable('transito.db', 'Modelo', [
                { name: 'id', type: 'INTEGER', primaryKey: true },
                { name: 'nome', type: 'TEXT' },
            ]);
        } catch (error) {
            console.error('Erro ao criar a tabela "Modelo":', error);
        }
    };
    
    const createMotoristaTable = async () => {
        try {
            await SQLComponent.createTable('transito.db', 'Motorista', [
                { name: 'id', type: 'INTEGER', primaryKey: true },
                {name: 'checkbox_servidor', type: 'TEXT'},
                {name: 'data', type: 'TEXT'},
                { name: 'nome', type: 'TEXT' },
                { name: 'cpf', type: 'TEXT' },
                {name: 'cameraMotorista', type: 'TEXT'}
            ]);
            
        } catch (error) {
            console.error('Erro ao criar a tabela "Modelo":', error);
        }
    };
    
    
    const carregaMotoristaDoBanco = async (setMotoristas) => {
        try {
            const motoristas = await SQLComponent.getRecords('transito.db', 'Motorista');
            console.log("Motoristas carregados do banco:", motoristas);
            const motoristaNames = motoristas.map(motorista => motorista.id); // Obtém apenas os nomes dos motoristas
            setMotoristas(motoristaNames); // Atualiza o estado com os motoristas obtidos do banco
        } catch (error) {
            console.error("Erro ao carregar motoristas:", error);
        }
    };
    
    const addMotoristaBanco = async (motorista, setMotoristas) => {
        try {
            await sq.insert('transito.db', 'Motorista', { 
                nome: motorista.nome,
                cpf: motorista.cpf,
            });
            carregaMotoristaDoBanco(setMotoristas); // Atualiza os motoristas após a inserção
        } catch (error) {
            console.error("Erro ao inserir o motorista:", error);
        }
    };
    const carregaModeloDoBanco = async (setModelos) => {
        try {
            const modelo = await SQLComponent.getRecords('transito.db', 'Modelo');
            const ModeloNames = modelo.map(modelo => modelo.modelo); 
            setModelos(ModeloNames); 
            console.log("Modelos carregados:", ModeloNames);
        } catch (error) {
            console.error("Erro ao carregar modelos:", error);
        }
    };
    const addModeloBanco = async (modelo, setModelos) => {
        try {
            await sq.insert('transito.db', 'Modelo', { 
                nome: modelo
            });
            // Atualiza os modelos após a inserção
            carregaModeloDoBanco(setModelos);
        } catch (error) {
            console.error("Erro ao inserir o Modelo:", error);
        }
    };
    const createMarcaTable = async () => {
        try {
            await SQLComponent.createTable('transito.db', 'Marca', [
                { name: 'id', type: 'INTEGER', primaryKey: true },
                { name: 'nome', type: 'TEXT' },
            ]);
        } catch (error) {
            console.error('Erro ao criar a tabela "Marca":', error);
        }
    };
    const addMarcaBanco = async (marca, setMarcas) => {
        try {
            await sq.insert('transito.db', 'Marca', { 
                nome: marca
            });   
            carregaMarcaDoBanco(setMarcas);
        } catch (error) {
            console.error("Erro ao inserir a marca:", error);
        }
    };
    const carregaMarcaDoBanco = async (setMarcas) => {
        try {
            const marcas = await SQLComponent.getRecords('transito.db', 'Marca');
            const marcasNames = marcas.map(marca => marca.marca); // Extraímos apenas os nomes das marcas
            setMarcas(marcasNames); // Atualiza o estado com as marcas obtidas do banco
            console.log("Marcas carregadas:", marcasNames);
        } catch (error) {
            console.error("Erro ao buscar marcas:", error);
        }
    };
    const createCorTable = async () => {
        try {
            await SQLComponent.createTable('transito.db', 'Cor', [
                { name: 'id', type: 'INTEGER', primaryKey: true },
                { name: 'nome', type: 'TEXT' },
            ]);
        } catch (error) {
            console.error('Erro ao criar a tabela "Cor":', error);
        }}
    const carregaCorDoBanco = async (setCores) => {
            try {
                const cor = await SQLComponent.getRecords('transito.db', 'Cor');
                const CorNames = cor.map(cor => cor.cor); 
                setCores(CorNames); 
                console.log("Cores carregadas:", CorNames);
            } catch (error) {
                console.error("Erro ao carregar Cores:", error);
            }
        };
    const addNovaCorBanco = async (cor, setCores) => {
            try {
                await sq.insert('transito.db', 'Cor', { 
                    nome: cor
                });    
                carregaCorDoBanco(setCores);
            } catch (error) {
                console.error("Erro ao inserir a Cor:", error);
            }
        };
    const createCombustivelTable = async () => {
            try {
                await SQLComponent.createTable('transito.db', 'Combustivel', [
                    { name: 'id', type: 'INTEGER', primaryKey: true },
                    { name: 'nome', type: 'TEXT' },
                ]);
            } catch (error) {
                console.error('Erro ao criar a tabela "combustivel":', error);
            }}
    const carregaCombustivelDoBanco = async (setCombustivel) => {
                try {
                    const combustivel = await SQLComponent.getRecords('transito.db', 'Combustivel');
                    const CombustivelNames = combustivel.map(combustivel => combustivel.combustivel);  
                    setCombustivel(CombustivelNames); 
                    console.log("Combustiveis carregadas:", CombustivelNames);
                } catch (error) {
                    console.error("Erro ao carregar Combustiveis:", error);
                }
            };
    const addNovoCombustivelBanco = async (combustivel, setCombustivel) => {
                try {
                    await sq.insert('transito.db', 'Combustivel', { 
                        nome: combustivel
                    });
                    carregaCombustivelDoBanco(setCombustivel);
                } catch (error) {
                    console.error("Erro ao inserir a Combustivel:", error);
                }
            }
    return (
        <View style={styles.appContainer}>
     
            <Header
    title={headerTitle}
    items={headerItems}
    color={headerColor}
    navigation={navigation}
/>
            <View style={styles.container}>

                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('placaCadastro')}
                >
                    <Text style={styles.buttonText}>Registro de Veículo</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('motoristaRegistro')}
                >
                    <Text style={styles.buttonText}>Registro de Motorista</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('placaLista')}
                >
                    <Text style={styles.buttonText}>Veículos</Text>
                </TouchableOpacity>

                
              
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
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
        backgroundColor: '#0051ff',
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