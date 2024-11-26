import * as SQLite from 'expo-sqlite';

// Função para abrir o banco de dados
const openDatabase = async (databaseName) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName);
    return db;
  } catch (error) {
    console.error('Erro ao abrir o banco de dados:', error);
    throw error;
  }
};

// Função para criar a tabela
const createTable = async (databaseName, tableName, columns = []) => {
  // Garantir que columns seja um array
  if (!Array.isArray(columns)) {
    throw new Error('A lista de colunas deve ser um array.');
  }

  if (columns.length === 0) {
    throw new Error('A lista de colunas não pode ser vazia.');
  }

  const db = await openDatabase(databaseName);  // Abrir o banco de dados

  const columnDefs = columns
    .map(col => {
      if (!col.name || !col.type) {
        throw new Error('Cada coluna deve ter nome e tipo.');
      }
      return `${col.name} ${col.type}${col.primaryKey ? ' PRIMARY KEY' : ''}`;
    })
    .join(', ');

  const foreignKeys = columns
    .filter(col => col.foreignKey)
    .map(col => `FOREIGN KEY(${col.name}) REFERENCES ${col.foreignKey.table}(${col.foreignKey.column})`)
    .join(', ');

  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefs}${foreignKeys ? ',' + foreignKeys : ''})`;

  try {
    await db.runAsync(query);
    console.log(`Tabela ${tableName} criada com sucesso!`);
  } catch (error) {
    console.error(`Erro ao criar a tabela ${tableName}:`, error);
    throw error;
  }
};

// Função para inserir um registro
const insertRecord = async (databaseName, tableName, data) => {
  const db = await openDatabase(databaseName);
  const columns = Object.keys(data).join(',');
  const values = Object.values(data).map(value => `'${value}'`).join(',');

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

  try {
    await db.runAsync(query);
    console.log('Registro inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir o registro:', error);
    throw error;
  }
};

// Função para listar todos os registros de uma tabela
const getAllRecords = async (databaseName, tableName) => {
  const db = await openDatabase(databaseName);
  const query = `SELECT * FROM ${tableName}`;

  try {
    const result = await db.getAllAsync(query);
    return result;
  } catch (error) {
    console.error('Erro ao listar registros:', error);
    throw error;
  }
};

// Função para listar registros por uma condição
const getRecordsByCondition = async (databaseName, tableName, columnName, value) => {
  const db = await openDatabase(databaseName);
  const query = `SELECT * FROM ${tableName} WHERE ${columnName} = ?`;

  try {
    const result = await db.getAllAsync(query, [value]); // Passando o valor para o filtro
    return result;
  } catch (error) {
    console.error(`Erro ao listar registros de ${tableName} por ${columnName}:`, error);
    throw error;
  }
};

// Função para excluir um registro
const deleteRecord = async (databaseName, tableName, column, value) => {
  const db = await openDatabase(databaseName);
  const query = `DELETE FROM ${tableName} WHERE ${column} = ?`;

  try {
    await db.runAsync(query, [value]);
    console.log(`Registro com ${column} = ${value} excluído com sucesso!`);
  } catch (error) {
    console.error('Erro ao excluir o registro:', error);
    throw error;
  }
};

// Função para editar um registro
const editRecord = async (databaseName, tableName, data, column, value) => {
  const db = await openDatabase(databaseName);
  
  // Cria a parte do SET da query com base nos dados a serem atualizados
  const setQuery = Object.keys(data)
    .map(key => `${key} = '${data[key]}'`)
    .join(', ');

  const query = `UPDATE ${tableName} SET ${setQuery} WHERE ${column} = ?`;

  try {
    await db.runAsync(query, [value]);
    console.log('Registro atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao editar o registro:', error);
    throw error;
  }
};

// Função para deletar uma tabela
const deleteTable = async (databaseName, tableName) => {
  const db = await openDatabase(databaseName);
  const query = `DROP TABLE IF EXISTS ${tableName}`;

  try {
    await db.runAsync(query);
    console.log(`Tabela ${tableName} excluída com sucesso!`);
  } catch (error) {
    console.error(`Erro ao excluir a tabela ${tableName}:`, error);
    throw error;
  }
};

// Função para listar registros relacionados (Inline) e permitir CRUD direto
const getInlineRelatedRecords = async (databaseName, mainTable, relatedTable, foreignKey) => {
  const db = await openDatabase(databaseName);
  const query = `
    SELECT ${mainTable}.*, ${relatedTable}.* 
    FROM ${mainTable}
    LEFT JOIN ${relatedTable} ON ${mainTable}.id = ${relatedTable}.${foreignKey}
  `;

  try {
    const results = await db.getAllAsync(query);
    return results;
  } catch (error) {
    console.error(`Erro ao buscar registros relacionados de ${mainTable} e ${relatedTable}:`, error);
    throw error;
  }
};


// Função para agrupar registros por uma coluna relacionada (ex.: livros por autor)
const getGroupedRecords = async (databaseName, mainTable, relatedTable, groupByColumn, foreignKey) => {
  const db = await openDatabase(databaseName);
  const query = `
    SELECT ${mainTable}.name AS ${groupByColumn}, ${relatedTable}.* 
    FROM ${mainTable}
    JOIN ${relatedTable} ON ${mainTable}.id = ${relatedTable}.${foreignKey}
    ORDER BY ${mainTable}.${groupByColumn}
  `;

  try {
    const groupedResults = await db.getAllAsync(query);
    return groupedResults;
  } catch (error) {
    console.error(`Erro ao agrupar registros de ${relatedTable} por ${groupByColumn}:`, error);
    throw error;
  }
};

// Exporta todas as funções
export default {
  createTable,
  insertRecord,
  getAllRecords,
  deleteRecord,
  deleteTable,
  editRecord,
  getRecordsByCondition,
  getInlineRelatedRecords,
  getGroupedRecords,
};