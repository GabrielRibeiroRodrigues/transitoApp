import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

export default function Header({ title, items }) {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.bottomRow}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            style={styles.button}
            onPress={item[2]} // A função de ação está na terceira posição do array
          >
            <Text style={styles.buttonText}>{item[0]}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007bff',
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
