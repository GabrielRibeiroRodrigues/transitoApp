import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, TextInput } from 'react-native';
import database from '../components/SQliteComponent';
import FormComponent from '../components/FormComponent';
const DataTable = ({ databaseName, tableName, fields, campos, edicao,ocultar}) => {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(null);  // ID do item sendo editado
  const [editedData, setEditedData] = useState(null);  // Dados do item a ser editado
  const [showForm, setShowForm] = useState(false);
  const [showLista, setShowLista] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBarraDeBusca, setshowBarraDeBusca] = useState(true);
  const [camposs, setCampos] = useState(null); //
  const [foreignKeyValor, setForeignKeyValues] = useState({});
console.log('MEU OCULTAR:', ocultar);
console.log('FOREIGN KEY:',foreignKeyValor.modelo_id);
  // Carregar os dados do banco de dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data from database: ${databaseName}, table: ${tableName}`);
        const result = await database.getAllRecords(databaseName, tableName);
        console.log('Fetched data:', result);
        setData(result);
        setFilteredData(result); // Inicializa o filteredData com todos os dados
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    

    const fetchCamposs = async () => {
      try {
        const schema = await database.getTableSchema(databaseName, tableName);
        console.log('Schema da tabela:', schema);
        const mac = gerarFields(schema,ocultar); // Gera os 
        console.log('DENTRO DA FUNÇÃO', ocultar);
        console.log('Fields gerados:', mac);
        setCampos(mac); // Atualiza o estado com os fields
      } catch (error) {
        console.error('Erro ao consultar o esquema da tabela:', error);
      }
    };
    
    fetchCamposs();

    fetchData();
  }, [databaseName, tableName]);


  const gerarFields = (tipos, campos_ocultos) => {
    return tipos.map(({ dataType, columnName, isForeignKey }) => {
      if (!isForeignKey && !campos_ocultos.includes(columnName)) {
        console.log('Campo de texto:', columnName);
        return ["text", columnName];}
        else if(columnName == 'marca_id') {
          const valores = foreignKeyValor.marca_id || [];
        console.log('Valores carregados:', valores);
  
        return ["picker", columnName, valores];
        }
       else if (isForeignKey && !campos_ocultos.includes(columnName)) {
        console.log('Chave estrangeira:', columnName);
  
        // Verifique se o valor de foreignKeyValor[columnName] existe
        const valores = foreignKeyValor[columnName] || [];
        console.log('Valores carregados:', valores);
  
        return ["picker", columnName, valores];
      } else {
        return null; 
      }
    }).filter(Boolean);
  };
  
    const carregaForeignKeys = async (fk, setValues) => {
      const results = {};
      try {
          for (const key in fk) {
              const { databaseName, tableName, displayField } = fk[key];
              const registros = await database.getAllRecords(databaseName, tableName);
              results[key] = registros.map(registro => registro[displayField]);
          }
          setValues(results);
      } catch (error) {
          console.error("Erro ao carregar chaves estrangeiras:", error);
      }
  };
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
  
  // Filtrar os dados sempre que o termo de pesquisa mudar
  useEffect(() => {
    const filtered = data.filter((item) =>
      fields.some((field) =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered); // Atualiza os dados filtrados
    carregaForeignKeys(fk, setForeignKeyValues)
  }, [searchTerm, data, fields]);

  const handleDelete = (id) => {
    console.log(`Preparing to delete record with ID: ${id}`);
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este item?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              console.log(`Deleting record with ID: ${id}`);
              await database.deleteRecord(databaseName, tableName, 'id', id);
              setData(data.filter((item) => item.id !== id));  // Remove o item da lista local
              console.log('Item deleted successfully');
            } catch (error) {
              console.error('Erro ao excluir o registro:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleEdit = (item) => {
    console.log('Editing item:', item);
    setEditing(item.id);  // Marca o item como sendo editado
    setEditedData(item);   // Preenche os dados para edição
    setShowForm(true); 
    setShowLista(false);   // Exibe o formulário de edição
    setshowBarraDeBusca(false); // Esconde a barra de busca
    console.log("edit resposta", edicao); //)
  };

  const handleSubmit = (formData) => {
    handleSaveEdit(formData);
    console.log("ababa", formData); // Exibe o formulário
    setShowLista(true);
  };

  const handleSaveEdit = async (formData) => { 
    try {
      await database.editRecord(databaseName, tableName, formData, 'id', editedData.id);
      console.log('edit id', editedData.id);
      console.log('dados', formData);
      setData((prevData) => {
        return prevData.map((item) => 
          item.id === editedData.id ? { ...item, ...formData } : item
        );
      }) // Atualiza a lista local
      setEditing(null);  // Desativa o modo de edição
      setShowForm(false);  // Fecha o formulário de edição
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Erro ao editar o registro:', error);
    }
  };

  const handleChange = (field, value) => {
    console.log(`Changing field ${field} to value ${value}`);
    setEditedData(prevState => {
      const newState = { ...prevState, [field]: value };
      console.log('Updated editedData:', newState);  // Log para verificar como o estado está mudando
      return newState;
    });
  };

  const handleCancelEdit = () => {
    console.log('Canceling edit');
    setEditing(null);  // Cancela a edição
    setEditedData(null);  // Reseta os dados editados
    setShowForm(false);  // Fecha o formulário de edição
  };

  
  
  
 
  // const tabelaTipos = [
  //   { name: "nome", type: "text" },
  //   { name: "email", type: "text" },
  //   { name: "modelo", type: "picker",fk : reg}
  // ];

  

  return (
    <ScrollView style={styles.container}>
      {showBarraDeBusca && (
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      )}
      {showLista && filteredData.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.content}>
            {fields.map((field) => (
              <Text key={field} style={styles.field}>
                {field}: {item[field]}
              </Text>
            ))}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconButton}>
              <Text>🗑️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconButton}>
              <Text>✏️</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {showForm && editedData && (
        
        <FormComponent 
          database={databaseName}
          tabelas = {tableName}
          fields= {camposs}
          onSubmit={handleSubmit}  
          initialData={editedData}  
          edicao = {1}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchInput: {
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  field: {
    fontSize: 14,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginHorizontal: 5,
  },
});

export default DataTable;
