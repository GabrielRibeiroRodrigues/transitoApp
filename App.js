import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ProdutoCriar from './src/screens/produtos/produtoCriar';
import ProdutoGeral from './src/screens/produtos/produtoGeral';
import ProdutoListar from './src/screens/produtos/produtoListar';
import ProdutoEditar from './src/screens/produtos/produtoEditar';

import PlacaCadastro from './src/screens/placaCadastro';
import PlacaLista from './src/screens/placaLista';
import PlacaDetalhada from './src/screens/placaDetalhada';
import PlacaExcluir from './src/screens/placaExcluir';
const Stack = createStackNavigator();
const App = () => {
return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="produtoCriar" component={ProdutoCriar} /> 
<Stack.Screen name="produtoGeral" component={ProdutoGeral} /> 
<Stack.Screen name="produtoListar" component={ProdutoListar} />
<Stack.Screen name="produtoEditar" component={ProdutoEditar} />

<Stack.Screen name="placaCadastro" component={PlacaCadastro} />
<Stack.Screen name="placaLista" component={PlacaLista} />
<Stack.Screen name="placaDetalhada" component={PlacaDetalhada} />
<Stack.Screen name="placaExcluir" component={PlacaExcluir} />

</Stack.Navigator>
</NavigationContainer>
);
};  
export default App;   