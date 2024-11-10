
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
const ProdutoGeral = ({ navigation }) => {
return (
<View style={styles.container}>
<Text style={styles.title}>Loja de Roupas</Text>
<Button
title="Criar Produtos"
onPress={() => navigation.navigate('produtoCriar')}
/>
<Button
title="Listar Produtos"
onPress={() => navigation.navigate('produtoListar')}
/>

</View>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'top',
alignItems: 'center',
},
title: {
fontSize: 25,
marginBottom: 50,

},
});
export default ProdutoGeral;