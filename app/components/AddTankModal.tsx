import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddTankModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (name: string, ph?: number, temperature?: number, ammonia?: number, nitrite?: number) => Promise<void>;
}

export function AddTankModal({ visible, onClose, onAdd }: AddTankModalProps) {
    const [name, setName] = useState('');
    const [ph, setPh] = useState('');
    const [temperature, setTemperature] = useState('');
    const [ammonia, setAmmonia] = useState('');
    const [nitrite, setNitrite] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleAdd() {
        if (!name) return;
        try {
            setIsSubmitting(true);
            await onAdd(
                name,
                ph ? parseFloat(ph) : undefined,
                temperature ? parseFloat(temperature) : undefined,
                ammonia ? parseFloat(ammonia) : undefined,
                nitrite ? parseFloat(nitrite) : undefined
            );
            setName('');
            setPh('');
            setTemperature('');
            setAmmonia('');
            setNitrite('');
            onClose();
        } catch (error) {
            console.error('Error in AddTankModal:', error);
            alert('Erro ao adicionar tanque');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Cadastrar Tanque</Text>

                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ex: Tanque A" />

                    <Text style={styles.label}>pH</Text>
                    <TextInput style={styles.input} value={ph} onChangeText={setPh} keyboardType="decimal-pad" placeholder="Ex: 7.2" />

                    <Text style={styles.label}>Temperatura (°C)</Text>
                    <TextInput style={styles.input} value={temperature} onChangeText={setTemperature} keyboardType="decimal-pad" placeholder="Ex: 26" />

                    <Text style={styles.label}>Amônia (mg/L)</Text>
                    <TextInput style={styles.input} value={ammonia} onChangeText={setAmmonia} keyboardType="decimal-pad" placeholder="Ex: 0.5" />

                    <Text style={styles.label}>Nitrito (mg/L)</Text>
                    <TextInput style={styles.input} value={nitrite} onChangeText={setNitrite} keyboardType="decimal-pad" placeholder="Ex: 0.2" />

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.cancel} onPress={onClose} disabled={isSubmitting}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.add} onPress={handleAdd} disabled={isSubmitting}>
                            <Text style={styles.addText}>{isSubmitting ? 'Adicionando...' : 'Adicionar'}</Text>
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
    add: { flex: 1, marginLeft: 8, padding: 12, borderRadius: 8, backgroundColor: '#2196F3', alignItems: 'center' },
    cancelText: { color: '#666' },
    addText: { color: '#fff', fontWeight: '700' },
});
