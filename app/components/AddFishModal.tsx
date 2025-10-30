import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface AddFishModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (species: string, age: number, size: number) => void;
}

export function AddFishModal({ visible, onClose, onAdd }: AddFishModalProps) {
    const [species, setSpecies] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [size, setSize] = useState<string>('');

    function handleAdd() {
        if (species && age && size) {
            onAdd(species, parseInt(age), parseFloat(size));
            setSpecies('');
            setAge('');
            setSize('');
            onClose();
        }
    }

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Cadastrar Peixe</Text>

                    <Text style={styles.label}>Espécie</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Tilápia"
                        value={species}
                        onChangeText={setSpecies}
                    />

                    <Text style={styles.label}>Idade (meses)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 6"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Tamanho (cm)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 15.5"
                        value={size}
                        onChangeText={setSize}
                        keyboardType="decimal-pad"
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                            <Text style={styles.addButtonText}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666666',
    },
    addButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        backgroundColor: '#2196F3',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});
