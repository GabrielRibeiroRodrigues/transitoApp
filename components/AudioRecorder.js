// // AudioRecorder.js
// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import { Audio } from 'expo-av';

// export default function AudioRecorder() {
//   const [recording, setRecording] = useState(null);
//   const [recordingUri, setRecordingUri] = useState(null);
//   const [sound, setSound] = useState(null);
//   const [message, setMessage] = useState('Pressione o botão para iniciar a gravação');

//   const startRecording = async () => {
//     try {
//       console.log('Solicitando permissões...');
//       const permission = await Audio.requestPermissionsAsync();
//       if (permission.status !== 'granted') {
//         setMessage('Permissão para acessar o microfone não foi concedida');
//         return;
//       }

//       setMessage('Iniciando gravação...');
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//       );

//       setRecording(recording);
//       setMessage('Gravando áudio...');
//     } catch (err) {
//       console.error('Falha ao iniciar a gravação', err);
//     }
//   };

//   const stopRecording = async () => {
//     console.log('Parando gravação...');
//     setRecording(null);
//     await recording.stopAndUnloadAsync();

//     const uri = recording.getURI();
//     setRecordingUri(uri);
//     setMessage('Gravação concluída');
//     console.log('URI da gravação:', uri);
//   };

//   const playSound = async () => {
//     if (recordingUri) {
//       const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
//       setSound(sound);
//       console.log('Reproduzindo som');
//       await sound.playAsync();
//     }
//   };

//   const stopSound = async () => {
//     if (sound) {
//       console.log('Parando som');
//       await sound.stopAsync();
//       setSound(null);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.message}>{message}</Text>
//       <Button
//         title={recording ? 'Parar Gravação' : 'Iniciar Gravação'}
//         onPress={recording ? stopRecording : startRecording}
//       />
//       {recordingUri && (
//         <View>
//           <Text>URI da gravação: {recordingUri}</Text>
//           <Button title="Reproduzir" onPress={playSound} />
//           {sound && <Button title="Parar Reprodução" onPress={stopSound} />}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   message: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
// });
