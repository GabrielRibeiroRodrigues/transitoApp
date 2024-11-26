import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Button } from 'react-native';

const ViewDataComponent = ({ data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    if (!data || data.length === 0) {
        return <Text style={styles.noDataText}>Nenhum dado disponível</Text>;
    }

    return (
        <View style={styles.container}>
            {data.map((item, index) => (
                <Pressable key={index} style={styles.card} onPress={() => openModal(item)}>
                    <Text style={styles.title}>{item['Área']} - {item['Local']}</Text>
                    <Text style={styles.description}>{item['Descrição']}</Text>
                    <Text style={styles.date}>{item['Datahora'] || 'N/A'}</Text>
                    <Text style={styles.status}>Status: {item['Status'] || 'N/A'}</Text>
                </Pressable>
            ))}

            {/* Modal para exibir os detalhes */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedItem && (
                            <>
                                <Text style={styles.modalTitle}>{selectedItem['Área']} - {selectedItem['Local']}</Text>
                                <Text style={styles.modalDescription}>{selectedItem['Descrição']}</Text>
                                <Text style={styles.modalDate}>Data/Hora: {selectedItem['Datahora'] || 'N/A'}</Text>
                                <Text style={styles.modalStatus}>Status: {selectedItem['Status'] || 'N/A'}</Text>
                                <Button title="Fechar" onPress={closeModal} />
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#777',
    },
    status: {
        fontSize: 14,
        color: '#007BFF',
        marginTop: 5,
    },
    noDataText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    modalDate: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    modalStatus: {
        fontSize: 14,
        color: '#007BFF',
        marginBottom: 20,
    },
});

export default ViewDataComponent;
