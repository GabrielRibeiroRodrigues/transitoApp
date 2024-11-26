import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function BiometricAuth({ onAuthSuccess }) {
  const handleAuthentication = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert("Erro", "Dispositivo não suporta autenticação biométrica.");
        onAuthSuccess(false);
        return;
      }

      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (supportedTypes.length === 0) {
        Alert.alert("Erro", "Nenhuma biometria suportada encontrada.");
        onAuthSuccess(false);
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert("Erro", "Nenhuma biometria cadastrada.");
        onAuthSuccess(false);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autenticar",
        fallbackLabel: "Use senha",
      });

      if (result.success) {
        Alert.alert("Sucesso", "Autenticação bem-sucedida!");
        onAuthSuccess(true);
      } else {
        Alert.alert("Falha", "Autenticação falhou.");
        onAuthSuccess(false);
      }
    } catch (error) {
      console.log('Erro ao autenticar:', error);
      Alert.alert("Erro", "Erro ao autenticar.");
      onAuthSuccess(false);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
      <Text style={styles.buttonText}>Escanear biometria</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
});
