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

// Função para registrar logs de operações no banco
const logDatabaseOperation = (operationType, query, params) => {
  console.log(`Operação: ${operationType}`);
  console.log(`Consulta: ${query}`);
  console.log(`Parâmetros: ${JSON.stringify(params)}`);
};

// Função para criar a tabela
const createTable = async (databaseName, tableName, columns = []) => {
  if (!Array.isArray(columns)) {
    throw new Error('A lista de colunas deve ser um array.');
  }
  if (columns.length === 0) {
    throw new Error('A lista de colunas não pode ser vazia.');
  }

  const db = await openDatabase(databaseName);

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
  logDatabaseOperation('CREATE TABLE', query, []);

  try {
    await db.runAsync(query);
    console.log(`Tabela ${tableName} criada com sucesso!`);
  } catch (error) {
    console.error(`Erro ao criar a tabela ${tableName}:`, error);
    throw error;
  }
};

// Função para criar índices
const createIndex = async (databaseName, tableName, columnName) => {
  const db = await openDatabase(databaseName);
  const query = `CREATE INDEX IF NOT EXISTS idx_${tableName}_${columnName} ON ${tableName}(${columnName})`;
  logDatabaseOperation('CREATE INDEX', query, []);

  try {
    await db.runAsync(query);
    console.log(`Índice para ${columnName} na tabela ${tableName} criado com sucesso!`);
  } catch (error) {
    console.error('Erro ao criar índice:', error);
    throw error;
  }
};

// Função para inserir um registro
const insertRecord = async (databaseName, tableName, data) => {
  const db = await openDatabase(databaseName);
  const columns = Object.keys(data).join(',');
  const values = Object.values(data).map(value => `'${value}'`).join(',');

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
  logDatabaseOperation('INSERT', query, [data]);

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
  logDatabaseOperation('SELECT ALL', query, []);

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
  logDatabaseOperation('SELECT BY CONDITION', query, [value]);

  try {
    const result = await db.getAllAsync(query, [value]);
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
  logDatabaseOperation('DELETE', query, [value]);

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

  const setQuery = Object.keys(data)
    .map(key => `${key} = '${data[key]}'`)
    .join(', ');

  const query = `UPDATE ${tableName} SET ${setQuery} WHERE ${column} = ?`;
  logDatabaseOperation('UPDATE', query, [data, value]);

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
  logDatabaseOperation('DROP TABLE', query, []);

  try {
    await db.runAsync(query);
    console.log(`Tabela ${tableName} excluída com sucesso!`);
  } catch (error) {
    console.error(`Erro ao excluir a tabela ${tableName}:`, error);
    throw error;
  }
};

// Função para realizar agregações
const getAggregateData = async (databaseName, tableName, column, operation) => {
  const db = await openDatabase(databaseName);
  const query = `SELECT ${operation}(${column}) AS aggregate_value FROM ${tableName}`;
  logDatabaseOperation('AGGREGATE', query, []);

  try {
    const result = await db.getAsync(query);
    return result.aggregate_value;
  } catch (error) {
    console.error(`Erro ao realizar agregação: ${operation}(${column})`, error);
    throw error;
  }
};

// Função para listar registros relacionados (Inline)
const getInlineRelatedRecords = async (databaseName, mainTable, relatedTable, foreignKey) => {
  const db = await openDatabase(databaseName);
  const query = `
    SELECT ${mainTable}.*, ${relatedTable}.* 
    FROM ${mainTable}
    LEFT JOIN ${relatedTable} ON ${mainTable}.id = ${relatedTable}.${foreignKey}
  `;
  logDatabaseOperation('SELECT INLINE', query, []);

  try {
    const results = await db.getAllAsync(query);
    return results;
  } catch (error) {
    console.error(`Erro ao buscar registros relacionados de ${mainTable} e ${relatedTable}:`, error);
    throw error;
  }
};

// Função para obter os campos, tipos e limites de caracteres de uma tabela
const getTableSchema = async (databaseName, tableName) => {
  const db = await openDatabase(databaseName);

  // Consulta para obter as colunas da tabela
  const tableInfoQuery = `PRAGMA table_info(${tableName})`;
  // logDatabaseOperation('PRAGMA TABLE INFO', tableInfoQuery, []);

  // Consulta para obter as chaves estrangeiras da tabela
  const foreignKeyQuery = `PRAGMA foreign_key_list(${tableName})`;
  // logDatabaseOperation('PRAGMA FOREIGN KEY LIST', foreignKeyQuery, []);

  try {
    // Obter informações da tabela
    const tableInfo = await db.getAllAsync(tableInfoQuery);

    // Obter informações das chaves estrangeiras
    const foreignKeys = await db.getAllAsync(foreignKeyQuery);
    const foreignKeyColumns = foreignKeys.map((fk) => fk.from);

    // Processar o esquema da tabela
    const schema = tableInfo.map((row) => {
      const match = row.type.match(/(\w+)(\((\d+)\))?/);
      return {
        columnName: row.name,
        dataType: match ? match[1] : row.type,
        // maxLength: match && match[3] ? parseInt(match[3], 10) : null,
        // isPrimaryKey: !!row.pk,
        isForeignKey: foreignKeyColumns.includes(row.name), // Verifica se é chave estrangeira
      };
    });

    // console.log(schema);
    return schema;
  } catch (error) {
    console.error(`Erro ao obter o esquema da tabela ${tableName}:`, error);
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
  createIndex,
  getAggregateData,
  getInlineRelatedRecords,
  getTableSchema,
};