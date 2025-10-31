import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Fish, Tank } from '../types/Fish';

interface EditFishModalProps {
    visible: boolean;
    fish: Fish | null;
    tanks: Tank[];
    onClose: () => void;
    onEdit: (id: number, species: string, age: number, size: number, tankId?: number) => Promise<void>;
}

export function EditFishModal({ visible, fish, tanks, onClose, onEdit }: EditFishModalProps) {
    const [species, setSpecies] = useState(fish?.species || '');
    const [age, setAge] = useState(fish?.age.toString() || '');
    const [size, setSize] = useState(fish?.size.toString() || '');
    const [selectedTankId, setSelectedTankId] = useState<number | undefined>(fish?.tankId);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Debug: verificar se tanks está sendo recebido
    React.useEffect(() => {
        console.log('EditFishModal - Tanks recebidos:', tanks);
        console.log('EditFishModal - Quantidade de tanks:', tanks.length);
    }, [tanks]);

    React.useEffect(() => {
        if (fish) {
            setSpecies(fish.species);
            setAge(fish.age.toString());
            setSize(fish.size.toString());
            setSelectedTankId(fish.tankId);
        }
    }, [fish]);

    async function handleEdit() {
        if (fish && species && age && size && !isSubmitting) {
            try {
                setIsSubmitting(true);
                await onEdit(fish.id, species, parseInt(age), parseFloat(size), selectedTankId);
                onClose();
            } catch (error) {
                console.error('Error in EditFishModal:', error);
                alert('Erro ao editar peixe. Tente novamente.');
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>Editar Peixe</Text>

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

                        <Text style={styles.label}>Tanque (opcional)</Text>
                        <View style={styles.tankSelector}>
                            <TouchableOpacity
                                style={[
                                    styles.tankOption,
                                    selectedTankId === undefined && styles.tankOptionSelected,
                                ]}
                                onPress={() => setSelectedTankId(undefined)}
                            >
                                <Text
                                    style={[
                                        styles.tankOptionText,
                                        selectedTankId === undefined && styles.tankOptionTextSelected,
                                    ]}
                                >
                                    Nenhum
                                </Text>
                            </TouchableOpacity>
                            {tanks.map((tank) => (
                                <TouchableOpacity
                                    key={tank.id}
                                    style={[
                                        styles.tankOption,
                                        selectedTankId === tank.id && styles.tankOptionSelected,
                                    ]}
                                    onPress={() => setSelectedTankId(tank.id)}
                                >
                                    <Text
                                        style={[
                                            styles.tankOptionText,
                                            selectedTankId === tank.id && styles.tankOptionTextSelected,
                                        ]}
                                    >
                                        {tank.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
                            onPress={handleEdit}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.saveButtonText}>
                                {isSubmitting ? 'Salvando...' : 'Salvar'}
                            </Text>
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
    saveButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
    },
    saveButtonDisabled: {
        backgroundColor: '#B0BEC5',
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    tankSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    tankOption: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    tankOptionSelected: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    tankOptionText: {
        fontSize: 14,
        color: '#666666',
    },
    tankOptionTextSelected: {
        color: '#ffffff',
    },
});
