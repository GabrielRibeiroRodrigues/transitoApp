import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const ExpandableMenu = ({ isOpen, onClose, routes }) => {
  const menuPosition = useSharedValue(-300); // Inicialmente fora da tela à esquerda

  if (isOpen) {
    menuPosition.value = withSpring(0, {
      damping: 100, // Ajuste o damping para controlar a "rigidez" da animação
      stiffness: 100, // Ajuste a stiffness para controlar a velocidade da animação
      overshootClamping: false, // Desativa o efeito de "bounce"
    });
  } else {
    menuPosition.value = withSpring(-300, {
      damping: 100,
      stiffness: 100,
      overshootClamping: false,
    });
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: menuPosition.value }],
    };
  });

  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
    onClose(); // Fecha o menu após a navegação
  };

  return (
    <Animated.View style={[styles.menuContainer, animatedStyle]}>
      <View style={styles.header}>
        <Text style={styles.menuTitle}>Menu de navegação</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </Pressable>
      </View>
      <View style={styles.menuItems}>
        {routes.map((route, index) => (
          <Pressable key={index} onPress={() => handleNavigation(route.screenName)} style={styles.menuItem}>
            <Text style={styles.menuItemText}>{route.label}</Text>
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    // Utilizando boxShadow ao invés de shadow*
    boxShadow: '5px 0px 4px rgba(0, 0, 0, 0.2)',
    elevation: 5, // Mantém a elevação para plataformas que suportam
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuItems: {
    marginTop: 10,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuItemText: {
    fontSize: 18,
    marginVertical: 8,
  },
});

export default ExpandableMenu;