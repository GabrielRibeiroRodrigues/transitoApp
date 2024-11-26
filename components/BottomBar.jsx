import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';

const BottomBar = ({ navigation }) => {
  const [showMessage, setShowMessage] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Inicializando o valor de opacidade para a animação

  // Função para animar a exibição e ocultação da mensagem
  const handlePress = () => {
    setShowMessage(true); // Exibe a mensagem
    Animated.timing(fadeAnim, {
      toValue: 1, // Opacidade final (completamente visível)
      duration: 400, // Duração do efeito de surgimento
      useNativeDriver: true, // Usando o driver nativo
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0, // Opacidade final (completamente invisível)
        duration: 300, // Duração do efeito de desaparecimento
        useNativeDriver: true,
      }).start(() => setShowMessage(false)); // Oculta a mensagem após a animação
    }, 1500); // Mensagem desaparece após 1,5 segundos
  };

  return (
    <View style={styles.bottomBar}>
      <Pressable style={styles.menuButton} onPress={handlePress}>
        <Text style={styles.menuText}>B</Text>
      </Pressable>
      <Pressable style={styles.menuButton} onPress={handlePress}>
        <Text style={styles.menuText}>C</Text>
      </Pressable>
      <Pressable style={styles.menuButton} onPress={handlePress}>
        <Text style={styles.menuText}>S</Text>
      </Pressable>

      {/* View que mostra a mensagem de "Em desenvolvimento" com animação */}
      {showMessage && (
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.messageText}>Em Desenvolvimento...</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    width: '100%',
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  messageContainer: {
    position: 'absolute', // Para posicionar no centro da tela
    top: '50%', 
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -20 }], // Para centralizar
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo semi-transparente
    borderRadius: 5,
    zIndex: 1, // Certifica-se de que a mensagem fique sobre outros componentes
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BottomBar;
