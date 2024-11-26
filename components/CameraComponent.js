// import React, { useState, useRef, useEffect } from 'react';
// import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
// import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

// export function CameraPhotoComponent({ onPhotoTaken }) {
//   const [facing, setFacing] = useState('back');
//   const [permission, requestPermission] = useCameraPermissions();
//   const cameraRef = useRef(null);
//   const [photoUri, setPhotoUri] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);

//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   }

//   async function takePicture() {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       setPhotoUri(photo.uri);
//       setShowCamera(false);
//       onPhotoTaken(photo.uri);  // Pass photo URI to parent component
//     }
//   }

//   function openCamera() {
//     setShowCamera(true);
//   }

//   return (
//     <View style={styles.container}>
//       {!showCamera ? (
//         <>
//           <Button title="Tirar foto" onPress={openCamera} />
//           {photoUri && (
//             <View style={styles.previewContainer}>
//               <Text style={styles.previewText}>Photo Preview:</Text>
//               <Image source={{ uri: photoUri }} style={styles.previewImage} />
//             </View>
//           )}
//         </>
//       ) : (
//         <CameraView
//           style={styles.camera}
//           facing={facing}
//           ref={cameraRef}
//         >
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//               <Text style={styles.text}>Flip Camera</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={takePicture}>
//               <Text style={styles.text}>Tirar foto</Text>
//             </TouchableOpacity>
//           </View>
//         </CameraView>
//       )}
//     </View>
//   );
// }

// export function QRCodeScannerComponent({ onQRCodeScanned }) {
//   const [scanned, setScanned] = useState(false);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scannedData, setScannedData] = useState('');

//   useEffect(() => {
//     const getCameraPermissions = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     };

//     getCameraPermissions();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     setScannedData(data); // Armazena os dados do QR Code escaneado
//     onQRCodeScanned(data); // Passa os dados do QR Code escaneado para o componente pai
//   };

//   return (
//     <View style={styles.container}>
//       {hasPermission === null && <Text>Requesting for camera permission</Text>}
//       {hasPermission === false && <Text>No access to camera</Text>}
      
//       {hasPermission && !scanned && (
//         <CameraView
//           onBarcodeScanned={handleBarCodeScanned}
//           barcodeScannerSettings={{
//             barcodeTypes: ["qr", "pdf417"],
//           }}
//           style={StyleSheet.absoluteFillObject}
//         />
//       )}

//       {scanned && (
//         <View style={styles.qrScannerContainer}>
//           <Text style={styles.scannedText}>QR Code scaneado com sucesso!</Text>
//           <Text style={styles.scannedData}>Informação lida: {scannedData}</Text>
//           <Button title={'Escaneie novamente'} onPress={() => setScanned(false)} />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       width: '100%',
//     },
//     camera: {
//       flex: 1,
//     },
//     buttonContainer: {
//       flex: 1,
//       flexDirection: 'row',
//       backgroundColor: 'transparent',
//       margin: 64,
//     },
//     button: {
//       flex: 1,
//       alignSelf: 'flex-end',
//       alignItems: 'center',
//     },
//     text: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       color: 'white',
//     },
//     previewContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     previewText: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginVertical: 10,
//     },
//     previewImage: {
//       width: 300,
//       height: 300,
//     },
//   qrScannerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scannedText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   scannedData: {
//     fontSize: 16,
//     marginVertical: 10,
//     marginBottom: 20,
//   },
// });
