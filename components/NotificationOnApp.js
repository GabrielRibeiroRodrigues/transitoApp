import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar, Button, Text, useTheme } from 'react-native-paper'; // Importe 'useTheme' do 'react-native-paper'

const NotificationOnApp = ({ title, message }) => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme(); // Use o hook 'useTheme' para acessar o tema do react-native-paper

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar} dark={true} textColor="#2196F3">Mostrar Notificação</Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: '#2196F3' }}
        action={{
          label: 'Fechar',
          textColor: "white",
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#fff', // Cor branca para o título
  },
  message: {
    fontSize: 14,
    color: '#fff', // Cor branca para a mensagem
  },
});

export { NotificationOnApp };
