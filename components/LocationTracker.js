// // LocationTracker.js

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
// import * as Location from 'expo-location';

// // Componente para obtenção automática de coordenadas
// const AutomaticCoordinates = () => {
//   const [coordinates, setCoordinates] = useState([]);
//   const [errorMsg, setErrorMsg] = useState('');
//   const latestLocationRef = useRef(null);
//   const isMountedRef = useRef(true);
//   const locationWatchIdRef = useRef(null);

//   useEffect(() => {
//     const getAutomaticCoordinates = async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           throw new Error('Permissão para acessar localização foi negada');
//         }

//         let tempCoordinates = [];

//         const updateCoordinates = (location) => {
//           if (location && location.coords) {
//             const newLocation = location.coords;
//             tempCoordinates.push([newLocation.latitude, newLocation.longitude]);
//             latestLocationRef.current = newLocation;
//             setCoordinates(formatCoordinates(tempCoordinates));
//           }
//         };

//         // Obtém as coordenadas iniciais
//         const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
//         updateCoordinates(location);

//         // Observa as mudanças de localização a cada 5 segundos
//         locationWatchIdRef.current = await Location.watchPositionAsync(
//           { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
//           (location) => {
//             updateCoordinates(location);
//           }
//         );
//       } catch (error) {
//         setErrorMsg(error.message);
//       }
//     };

//     const formatCoordinates = (coords) => {
//       return coords.map(coord => `[${coord.join(', ')}]`).join(', ');
//     };

//     getAutomaticCoordinates();

//     return () => {
//       isMountedRef.current = false;
//       if (locationWatchIdRef.current) {
//         locationWatchIdRef.current.remove();
//       }
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.section}>
//         <Text style={styles.title}>Coordenadas Automáticas:</Text>
//         <Text style={styles.coordinates}>
//           {coordinates}
//         </Text>
//         {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
//       </View>
//     </View>
//   );
// };

// // Componente para obtenção manual de coordenadas
// const ManualCoordinates = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [errorMsg, setErrorMsg] = useState('');

//   const getManualCoordinates = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         throw new Error('Permissão para acessar localização foi negada');
//       }

//       const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
//       if (location && location.coords) {
//         setLatitude(location.coords.latitude);
//         setLongitude(location.coords.longitude);
//         setErrorMsg('');
//       } else {
//         throw new Error('Localização não disponível');
//       }
//     } catch (error) {
//       setErrorMsg(error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.section}>
//         <Pressable style={styles.button} onPress={getManualCoordinates}>
//           <Text style={styles.buttonText}>Obter Coordenadas Manualmente</Text>
//         </Pressable>
//         {latitude !== null && longitude !== null && (
//           <View style={styles.coordinates}>
//             <Text style={styles.title}>Coordenadas Manuais:</Text>
//             <Text>Latitude: {latitude.toFixed(6)}</Text>
//             <Text>Longitude: {longitude.toFixed(6)}</Text>
//           </View>
//         )}
//         {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   section: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   coordinates: {
//     marginVertical: 10,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });

// export { AutomaticCoordinates, ManualCoordinates };
