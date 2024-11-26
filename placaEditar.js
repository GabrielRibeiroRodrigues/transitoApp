import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import sqlite from '../../components/SQliteComponent';
import { Picker } from '@react-native-picker/picker'; //SE PASSAR PRA ALGUEM LEMBRAR DE MANDAR INSTALAR O PICKER 
//npm install @react-native-picker/picker
import Header from '../../components/HeaderComponent';

const headerTitle = "Trânsito";

const headerItems = [
    ['Home', 'button', (navigation) => navigation.navigate('HomeTransito')],
    ['Registrar', 'button', (navigation) => navigation.navigate('PlacaCadastro')],
];
const PlacaEditar = ({ route, navigation }) => {
    const { placa } = route.params;
    const [placaEditada, setPlacaEditada] = useState({
        placas: placa.placas,
        proprietario: placa.proprietario,
        modelo_id: placa.modelo_id,
        marca_id: placa.marca_id,
        cor_id: placa.cor_id,
        combustivel_id: placa.combustivel_id,
        ano: placa.ano,
        renavam: placa.renavam,
        chassi: placa.chassi,
    });

    const [modelos, setModelos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [cores, setCores] = useState([]);
    const [combustiveis, setCombustiveis] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const modelosData = await sqlite.getAllRecords('myDatabase.db', 'Modelo');
                setModelos(modelosData.map(m => ({ id: m.id, name: m.modelo })));

                const marcasData = await sqlite.getAllRecords('myDatabase.db', 'Marca');
                setMarcas(marcasData.map(m => ({ id: m.id, name: m.marca })));

                const coresData = await sqlite.getAllRecords('myDatabase.db', 'Cor');
                setCores(coresData.map(c => ({ id: c.id, name: c.cor })));

                const combustiveisData = await sqlite.getAllRecords('myDatabase.db', 'Combustivel');
                setCombustiveis(combustiveisData.map(c => ({ id: c.id, name: c.combustivel })));
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (field, value) => {
        setPlacaEditada({ ...placaEditada, [field]: value });
    };

    const handleSave = async () => {
        try {
            await sqlite.editRecord('myDatabase.db', 'Veiculos', placaEditada, 'placas', placa.placas);
            console.log('Registro atualizado com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Header title={headerTitle} items={headerItems} />
            {/* <Text style={styles.title}>Editar Detalhes da Placa</Text> */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text>  Veículo: </Text>
            <TextInput
                style={styles.input}
                value={placaEditada.placas}
                onChangeText={(value) => handleInputChange('placas', value)}
                placeholder="Editar Placa"
            />
            <Text>  Proprietario: </Text>
            <TextInput
                style={styles.input}
                value={placaEditada.proprietario}
                onChangeText={(value) => handleInputChange('proprietario', value)}
                placeholder="Editar Proprietário"
            />
              <Text>  Marca: </Text>
            <Picker
                selectedValue={placaEditada.marca_id}
                onValueChange={(value) => handleInputChange('marca_id', value)}
                style={styles.picker}
            >
                {marcas.map((marca) => (
                    <Picker.Item key={marca.id} label={marca.name} value={marca.id} />
                ))}
            </Picker>
            <Text>  Modelo: </Text>
            <Picker
                selectedValue={placaEditada.modelo_id}
                onValueChange={(value) => handleInputChange('modelo_id', value)}
                style={styles.picker}
            >
                {modelos.map((modelo) => (
                    <Picker.Item key={modelo.id} label={modelo.name} value={modelo.id} />
                ))}
            </Picker>
            <Text>  Cor: </Text>
            <Picker
                selectedValue={placaEditada.cor_id}
                onValueChange={(value) => handleInputChange('cor_id', value)}
                style={styles.picker}
            >
                {cores.map((cor) => (
                    <Picker.Item key={cor.id} label={cor.name} value={cor.id} />
                ))}
            </Picker>
            <Text>  Ano: </Text>
            <TextInput
                style={styles.input}
                value={placaEditada.ano}
                onChangeText={(value) => handleInputChange('ano', value)}
                placeholder="Editar Ano"
            />
            <Text>  Combustível: </Text>
            <Picker
                selectedValue={placaEditada.combustivel_id}
                onValueChange={(value) => handleInputChange('combustivel_id', value)}
                style={styles.picker}
            >
                {combustiveis.map((combustivel) => (
                    <Picker.Item key={combustivel.id} label={combustivel.name} value={combustivel.id} />
                ))}
            </Picker>
            <Text>  Renavam: </Text>
            <TextInput
                style={styles.input}
                value={placaEditada.renavam}
                onChangeText={(value) => handleInputChange('renavam', value)}
                placeholder="Editar Renavam"
            />
            <Text>  Chassi: </Text>
            <TextInput
                style={styles.input}
                value={placaEditada.chassi}
                onChangeText={(value) => handleInputChange('chassi', value)}
                placeholder="Editar Chassi"
            />
            <Button title="Salvar Alterações" onPress={handleSave} color="#007BFF" />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        marginBottom: 12,
    },
    scrollContainer: {
        paddingBottom: 30,
    },
});

export default PlacaEditar;
