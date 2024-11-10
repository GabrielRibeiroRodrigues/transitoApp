import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, TextInput, Button, Pressable, 
  ScrollView, Image, LayoutAnimation, Platform 
} from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const FormComponent = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [dateError, setDateError] = useState(null);
  const [inlineFields, setInlineFields] = useState({});

  useEffect(() => {
    // Inicializa o estado dos campos inline com base nos campos passados
    const initialInlineFields = {};
    fields.forEach(field => {
      if (field[0] === 'inline') {
        initialInlineFields[field[1]] = [field[2]]; // Começa com um conjunto vazio
      }
    });
    setInlineFields(initialInlineFields);

  }, []); // Executa apenas uma vez na montagem do componente

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleRemoveImage = (name, index) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: prevData[name].filter((_, i) => i !== index),
    }));
  };

  const isValidDate = (day, month, year) => {
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

    if (isNaN(dayInt) || isNaN(monthInt) || isNaN(yearInt)) {
      return false; // Não é uma data válida se algum dos valores não for numérico
    }

    // Verifica se o dia está entre 1 e 31
    if (dayInt < 1 || dayInt > 31) {
      return false;
    }

    // Verifica se o mês está entre 1 e 12
    if (monthInt < 1 || monthInt > 12) {
      return false;
    }

    // Você pode adicionar aqui validações mais complexas para anos bissextos, etc.

    return true; // A data é válida
  };


  const pickImage = async (name) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const fileName = uri.split('/').pop(); // Captura o nome do arquivo a partir do URI
  
        // Exibe o nome do arquivo no console
        console.log(`Imagem escolhida: ${fileName}`);
  
        setFormData((prevData) => ({
          ...prevData,
          [name]: [...(prevData[name] || []), { uri, fileName }], // Armazena tanto o URI quanto o nome do arquivo
        }));
      }
    } catch (error) {
      console.error('Erro ao escolher imagem:', error);
    }
  };
  

  const CollapsibleField = ({ fields, label }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animação suave
      setIsCollapsed(!isCollapsed);
    };

    return (
      <View>
        <Pressable style={styles.collapsibleHeader} onPress={toggleCollapse}>
          <Text style={styles.collapsibleHeaderText}>{label}</Text>
          <Ionicons // Ícone de seta (substitua 'md-chevron-up' pelo nome do ícone desejado)
            name={isCollapsed ? 'chevron-down-outline' : 'chevron-up-outline'}
            size={24}
            color="black"
          />
        </Pressable>
        {!isCollapsed && (
          <View style={styles.collapsibleContent}>
            {fields.map(renderField)}
          </View>
        )}
      </View>
    );
  };

  const handleAddInlineField = (label) => {
    setInlineFields(prevFields => ({
      ...prevFields,
      [label]: [...prevFields[label], fields.find(f => f[1] === label)[2]], // Adiciona um novo conjunto de campos
    }));
  };

  const handleRemoveInlineField = (label, index) => {
    setInlineFields(prevFields => ({
      ...prevFields,
      [label]: prevFields[label].filter((_, i) => i !== index), // Remove o conjunto de campos no índice
    }));
  };

  const renderField = (field) => {
    const [type, label, options, collapsible] = field;
    const fieldName = type === 'upload' ? `upload_${label}` : label; // Adiciona prefixo "upload_" para campos de upload

    switch (type) {
      case 'text':
        return (
          <View key={label} style={styles.fieldContainer}>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
              style={styles.input}
              placeholder={label}
              value={formData[label] || ''}
              onChangeText={(text) => handleInputChange(label, text)}
            />
          </View>
        );
      case 'radio':
        return (
          <View key={label} style={styles.fieldContainer}>
            <Text style={styles.label}>{label}:</Text>
            <View style={styles.radioGroup}>
              {options.map((option) => (
                <Pressable
                  key={option}
                  style={styles.radioButton}
                  onPress={() => setFormData(prevData => ({ ...prevData, [label]: option }))} // Correção: adiciona o onPress para atualizar o estado
                >
                  <View style={[styles.radioButtonOuter, formData[label] === option && styles.radioButtonOuterActive]}>
                    {formData[label] === option && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={styles.radioText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        );
      case 'picker':
        return (
          <View key={label} style={styles.fieldContainer}>
            <Text style={styles.label}>{label}:</Text>
            <Picker
              style={styles.picker}
              selectedValue={formData[label] || ''}
              onValueChange={(value) => handleInputChange(label, value)}
            >
              {options && options.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            </Picker>
          </View>
        );
      case 'checkbox':
        return (
          <View key={label} style={styles.fieldContainer}>
            <Text style={styles.label}>{label}:</Text>
            {/* Verifica se existem opções */}
            {options && options.length > 0 ? (
              <View style={styles.checkboxGroup}>
                {options.map((option) => (
                  <View key={option} style={styles.checkboxItem}>
                    <Checkbox
                      style={styles.checkbox}
                      value={formData[label]?.includes(option) || false}
                      onValueChange={(newValue) => setFormData(prevData => ({
                        ...prevData,
                        [label]: newValue
                          ? (prevData[label] || []).concat(option) // Adiciona ao array se marcado
                          : (prevData[label] || []).filter(item => item !== option) // Remove do array se desmarcado
                      }))}
                    />
                    <Text style={styles.checkboxText}>{option}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.errorText}>Erro: Nenhuma opção disponível para {label}</Text>
            )}
          </View>
        );
      case 'textarea':
        return (
          <View key={label} style={styles.fieldContainer}>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              multiline
              rows={4}
              value={formData[label] || ''}
              onChangeText={(text) => handleInputChange(label, text)}
            />
          </View>
        );
      case 'upload':
        const uploadedImages = formData[fieldName] || []; // Obtém os URIs das imagens já carregadas

        return (
          <View key={label} style={styles.fieldContainer}>
            <Text style={styles.label}>{label}:</Text>
            <View style={styles.uploadContainer}>
              <Pressable onPress={() => pickImage(fieldName)}>
                <Text style={styles.uploadButton}>Escolher Imagem</Text>
              </Pressable>
              <ScrollView horizontal style={styles.imagePreviewContainer}>
                {uploadedImages.map((image, index) => {
                  const shortFileName = image.fileName.length > 10 ? image.fileName.substring(0, 7) + "..." : image.fileName;

                  return (
                    <View key={index} style={styles.imagePreviewItem}>
                      <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                      <Text style={styles.fileNameText}>{shortFileName}</Text>
                      <Pressable onPress={() => handleRemoveImage(fieldName, index)}>
                        <Text style={styles.removeButton}>X</Text>
                      </Pressable>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        );
      case 'date':
        return (
          <View key={label} style={styles.fieldContainer}>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={formData[label] || ''}
              onChangeText={(text) => {
                let formattedText = text.replace(/[^0-9]/g, '');
                if (formattedText.length > 2) formattedText = formattedText.slice(0, 2) + '/' + formattedText.slice(2);
                if (formattedText.length > 5) formattedText = formattedText.slice(0, 5) + '/' + formattedText.slice(5);
  
                setFormData(prevData => ({ ...prevData, [label]: formattedText }));
  
                const [day, month, year] = formattedText.split('/');
                if (day && month && year && !isValidDate(day, month, year)) {
                  setDateError('Data inválida');
                  formattedText = ''; // Limpa o campo se inválido
                } else {
                  setDateError(null);
                }
              }}
              inputMode="numeric"
              maxLength={10} // Limita o tamanho para 10 caracteres (DD/MM/AAAA)
            />
            {/* Exibe a mensagem de erro se existir */}
            {dateError && <Text style={styles.errorText}>{dateError}</Text>}
          </View>
        );
      case 'collapse':
        return (
          <CollapsibleField key={label} label={label} fields={options} />
        );
      case 'inline':
        const inlineFieldSets = inlineFields[label] || []; // Obtém os conjuntos de campos inline

        return (
          <View key={label} style={styles.fieldContainer}>
            {label && <Text style={styles.collapsibleHeaderText}>{label}:</Text>}
            {collapsible ? (
              <CollapsibleField key={label} label={label} fields={inlineFieldSets.map(set => set.map(renderField))} />
            ) : (
              inlineFieldSets.map((fieldSet, index) => (
                <View key={index} style={styles.inlineFieldContainer}>
                  {fieldSet.map(renderField)}
                  <Button title="-" onPress={() => handleRemoveInlineField(label, index)} />
                </View>
              ))
            )}
            <Button title="+" onPress={() => handleAddInlineField(label)} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      {fields.map(renderField)}
      <Pressable style={styles.submitButton} onPress={() => onSubmit(formData)}>
        <Text style={styles.submitButtonText}>Enviar</Text>
      </Pressable>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  picker: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 14,
    paddingLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxGroup: {
    flexDirection: 'column', // Exibe os checkboxes em uma coluna
    alignItems: 'flex-start', // Alinha os checkboxes à esquerda
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5, // Espaçamento vertical entre os checkboxes
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
  },
  textarea: {
    height: 100,
    verticalAlign: 'top',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // Adicionado fontSize
  },
  uploadContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  fileNameText: {
    fontSize: 14,
    marginRight: 5,
  },
  removeButton: {
    fontSize: 16,
    color: 'red',
  },
  errorText: {
    overflowWrap: 'break-word',
  },
  uploadButton: { // Estilos para o botão de upload
    backgroundColor: '#4CAF50', // Cor de fundo (verde)
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imagePreviewItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  radioGroup: {
    flexDirection: 'column',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  radioButtonOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonOuterActive: {
    borderColor: '#2196F3',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196F3',
  },
  radioText: {
    marginLeft: 10,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#2196F3', // Cor de fundo do botão (azul)
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  collapsibleHeader: {
    backgroundColor: '#f0f0f0', // Cor de fundo do header
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row', // Alinhar texto e ícone na horizontal
    alignItems: 'center', // Centralizar verticalmente
  },
  collapsibleHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  collapsibleContent: {
    paddingLeft: 20, // Indentação do conteúdo
  },
  // inlineContainer: {
  //   flexDirection: 'row', // Organizar os campos em linha
  //   flexWrap: 'wrap',     // Permitir que os campos quebrem para a próxima linha se necessário
  //   alignItems: 'center', // Centralizar verticalmente
  // },
  // inlineField: {
  //   flex: 1,             // Cada campo ocupa uma parte igual da linha
  //   minWidth: 120,        // Largura mínima para cada campo
  //   marginHorizontal: 5,  // Espaçamento horizontal entre os campos
  // },
});

export default FormComponent;