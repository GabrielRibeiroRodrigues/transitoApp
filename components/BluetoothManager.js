// import React, { useState, useEffect } from 'react';
// import { View, Text, Alert, Platform } from 'react-native';
// import { BleManager } from 'react-native-ble-plx';
// import * as Location from 'expo-location';

// const BluetoothManager = ({ deviceMacAddress, command, triggerCommand }) => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [manager] = useState(new BleManager());
//   const [device, setDevice] = useState(null);

//   useEffect(() => {
//     const subscription = manager.onStateChange((state) => {
//       if (state === 'PoweredOn') {
//         scanAndConnect();
//       }
//     }, true);

//     return () => subscription.remove();
//   }, [manager]);

//   const requestPermissions = async () => {
//     if (Platform.OS === 'android') {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permissão necessária', 'A permissão de localização é necessária para usar o Bluetooth.');
//       }
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   const scanAndConnect = () => {
//     manager.startDeviceScan(null, null, (error, scannedDevice) => {
//       if (error) {
//         console.log('Erro ao escanear dispositivos:', error);
//         return;
//       }

//       if (scannedDevice.id === deviceMacAddress) {
//         manager.stopDeviceScan();
//         connectToDevice(scannedDevice);
//       }
//     });
//   };

//   const connectToDevice = async (scannedDevice) => {
//     try {
//       const connectedDevice = await scannedDevice.connect();
//       await connectedDevice.discoverAllServicesAndCharacteristics();
//       setIsConnected(true);
//       setDevice(connectedDevice);
//     } catch (error) {
//       console.log('Erro ao conectar ao dispositivo:', error);
//       Alert.alert('Erro', 'Falha ao conectar ao dispositivo Bluetooth.');
//     }
//   };

//   const sendCommand = async (cmd) => {
//     if (device) {
//       const serviceUUID = '12345678-1234-1234-1234-123456789abc'; // Substitua com o UUID correto
//       const characteristicUUID = '87654321-4321-4321-4321-cba987654321'; // Substitua com o UUID correto

//       try {
//         await device.writeCharacteristicWithResponseForService(serviceUUID, characteristicUUID, cmd);
//         console.log(`Comando '${cmd}' enviado para o dispositivo.`);
//       } catch (error) {
//         console.log('Erro ao enviar comando:', error);
//         Alert.alert('Erro', 'Falha ao enviar comando para o dispositivo Bluetooth.');
//       }
//     }
//   };

//   useEffect(() => {
//     if (triggerCommand && isConnected) {
//       sendCommand(command);
//     }
//   }, [triggerCommand, isConnected]);

//   return (
//     <View>
//       <Text>{isConnected ? 'Conectado ao dispositivo Bluetooth' : 'Desconectado do dispositivo Bluetooth'}</Text>
//     </View>
//   );
// };

// export default BluetoothManager;