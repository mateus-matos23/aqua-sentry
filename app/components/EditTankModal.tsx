import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Tank } from '../types/Fish';

interface EditTankModalProps {
    visible: boolean;
    tank: Tank | null;
    onClose: () => void;
    onEdit: (id: number, name: string, ph?: number, temperature?: number, ammonia?: number, nitrite?: number) => Promise<void>;
}

export function EditTankModal({ visible, tank, onClose, onEdit }: EditTankModalProps) {
    const [name, setName] = useState('');
    const [ph, setPh] = useState('');
    const [temperature, setTemperature] = useState('');
    const [ammonia, setAmmonia] = useState('');
    const [nitrite, setNitrite] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (tank) {
            setName(tank.name);
            setPh(tank.ph?.toString() ?? '');
            setTemperature(tank.temperature?.toString() ?? '');
            setAmmonia(tank.ammonia?.toString() ?? '');
            setNitrite(tank.nitrite?.toString() ?? '');
        }
    }, [tank]);

    async function handleEdit() {
        if (!tank) return;
        try {
            setIsSubmitting(true);
            await onEdit(
                tank.id,
                name,
                ph ? parseFloat(ph) : undefined,
                temperature ? parseFloat(temperature) : undefined,
                ammonia ? parseFloat(ammonia) : undefined,
                nitrite ? parseFloat(nitrite) : undefined
            );
            onClose();
        } catch (error) {
            console.error('Error in EditTankModal:', error);
            alert('Erro ao editar tanque');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Editar Tanque</Text>

                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />

                    <Text style={styles.label}>pH</Text>
                    <TextInput style={styles.input} value={ph} onChangeText={setPh} keyboardType="decimal-pad" />

                    <Text style={styles.label}>Temperatura (°C)</Text>
                    <TextInput style={styles.input} value={temperature} onChangeText={setTemperature} keyboardType="decimal-pad" />

                    <Text style={styles.label}>Amônia (mg/L)</Text>
                    <TextInput style={styles.input} value={ammonia} onChangeText={setAmmonia} keyboardType="decimal-pad" />

                    <Text style={styles.label}>Nitrito (mg/L)</Text>
                    <TextInput style={styles.input} value={nitrite} onChangeText={setNitrite} keyboardType="decimal-pad" />

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.cancel} onPress={onClose} disabled={isSubmitting}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.save} onPress={handleEdit} disabled={isSubmitting}>
                            <Text style={styles.saveText}>{isSubmitting ? 'Salvando...' : 'Salvar'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    container: { width: '90%', backgroundColor: '#fff', borderRadius: 12, padding: 20 },
    title: { fontSize: 20, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
    label: { fontSize: 12, color: '#666', marginTop: 8 },
    input: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 10, marginTop: 6 },
    buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
    cancel: { flex: 1, marginRight: 8, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', alignItems: 'center' },
    save: { flex: 1, marginLeft: 8, padding: 12, borderRadius: 8, backgroundColor: '#4CAF50', alignItems: 'center' },
    cancelText: { color: '#666' },
    saveText: { color: '#fff', fontWeight: '700' },
});
