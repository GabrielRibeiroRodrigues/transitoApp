import AsyncStorage from '@react-native-async-storage/async-storage';

/** 
 * Salva dados no AsyncStorage.
 * Se já existir conteúdo, adiciona novos dados à lista existente.
 */
export const saveData = async (key, data) => {
  try {
    // Busca os dados existentes
    const existingData = await AsyncStorage.getItem(key);
    const parsedData = existingData ? JSON.parse(existingData) : [];

    // Adiciona os novos dados à lista existente
    const newData = [...parsedData, data];
    await AsyncStorage.setItem(key, JSON.stringify(newData));
    console.log(`Dados registrados com sucesso na chave '${key}'!`);
  } catch (error) {
    console.error(`Erro ao salvar os dados na chave '${key}':`, error);
  }
};

/** 
 * Recupera dados do AsyncStorage usando a chave fornecida.
 */
export const getData = async (key) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    const parsedData = storedData ? JSON.parse(storedData) : [];
    return Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error) {
    console.error(`Erro ao obter dados da chave '${key}':`, error);
    return [];
  }
};

/**
 * Atualiza um registro específico no AsyncStorage.
 * Atualiza apenas os campos informados, preservando os existentes.
 */
export const updateData = async (key, newData) => {
  try {
    const existingData = await getData(key);

    const updatedData = existingData.map((item) =>
      Object.keys(newData).every((field) => item[field] === newData[field])
        ? item
        : { ...item, ...newData }
    );

    await AsyncStorage.setItem(key, JSON.stringify(updatedData));
    console.log(`Dados atualizados com sucesso na chave '${key}'!`);
  } catch (error) {
    console.error(`Erro ao atualizar dados na chave '${key}':`, error);
  }
};

/** 
 * Exclui todos os registros relacionados a uma chave no AsyncStorage.
 */
export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Todos os dados da chave '${key}' foram excluídos com sucesso!`);
  } catch (error) {
    console.error(`Erro ao excluir dados da chave '${key}':`, error);
  }
};