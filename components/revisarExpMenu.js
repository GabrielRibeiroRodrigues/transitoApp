import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const ExpandableMenu = ({ routes }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuPosition = useSharedValue(-300); // Posição inicial fora da tela

  const toggleMenu = () => {
    menuPosition.value = withSpring(isMenuOpen ? -300 : 0, {
      damping: 100,
      stiffness: 100,
    });
    setIsMenuOpen((prev) => !prev);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: menuPosition.value }],
    };
  });

  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
    toggleMenu(); // Fecha o menu após a navegação
  };

  return (
    <>
      {/* Renderizando o botão de abrir o menu */}
      <Pressable onPress={toggleMenu} style={styles.menuButton}>
        <Image
          source={require('./assets/toggle-menu.png')}
          style={styles.menuIcon}
          resizeMode="cover"
        />
      </Pressable>

      {/* Menu animado */}
      <Animated.View style={[styles.menuContainer, animatedStyle]}>
        <View style={styles.header}>
          <Text style={styles.menuTitle}>Menu de navegação</Text>
          <Pressable onPress={toggleMenu} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
        </View>
        <View style={styles.menuItems}>
          {routes.map((route, index) => (
            <Pressable
              key={index}
              onPress={() => handleNavigation(route.screenName)}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>{route.label}</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 10,
    // Defina o botão no canto superior esquerdo
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 300,
    backgroundColor: '#000',
    padding: 20,
    boxShadow: '5px 0px 4px rgba(0, 0, 0, 0.2)',
    elevation: 5,
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
