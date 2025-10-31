import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AddTankModal } from '../components/AddTankModal';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import { EditTankModal } from '../components/EditTankModal';
import { TankCard } from '../components/TankCard';
import { getFishCountByTankId } from '../database/fishDatabase';
import { useTanks } from '../hooks/useTanks';
import { Tank } from '../types/Fish';

export default function TanksScreen() {
    const { tanks, isLoading, addTank, editTank, deleteTank } = useTanks();
    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [selected, setSelected] = useState<Tank | null>(null);
    const [fishCounts, setFishCounts] = useState<Map<number, number>>(new Map());

    useEffect(() => {
        console.log('🔄 Tanks changed, reloading fish counts. Tanks:', tanks.length);
        loadFishCounts();
    }, [tanks]);

    // Recarregar contagens quando a tela receber foco
    useFocusEffect(
        React.useCallback(() => {
            console.log('👁️ Tanks screen focused, reloading fish counts');
            loadFishCounts();
        }, [tanks])
    );

    async function loadFishCounts() {
        console.log('📊 Loading fish counts for', tanks.length, 'tanks');
        const counts = new Map<number, number>();
        for (const tank of tanks) {
            try {
                const count = await getFishCountByTankId(tank.id);
                console.log(`✅ Tank "${tank.name}" (ID: ${tank.id}) has ${count} fish`);
                counts.set(tank.id, count);
            } catch (error) {
                console.error(`Error loading fish count for tank ${tank.id}:`, error);
            }
        }
        console.log('🎯 Final fish counts map:', Object.fromEntries(counts));
        setFishCounts(counts);
    }

    function openEdit(tank: Tank) {
        setSelected(tank);
        setEditVisible(true);
    }

    function closeEdit() {
        setSelected(null);
        setEditVisible(false);
    }

    function openDelete(id: number) {
        const tank = tanks.find((t) => t.id === id);
        if (tank) {
            setSelected(tank);
            setDeleteVisible(true);
        }
    }

    function handleDelete() {
        if (selected) {
            deleteTank(selected.id);
            setDeleteVisible(false);
            setSelected(null);
        }
    }

    function cancelDelete() {
        setDeleteVisible(false);
        setSelected(null);
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2196F3" />
                <Text style={styles.loadingText}>Carregando tanques...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={tanks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TankCard
                        tank={item}
                        fishCount={fishCounts.get(item.id)}
                        onDelete={openDelete}
                        onEdit={openEdit}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🪣</Text>
                        <Text style={styles.emptyTitle}>Nenhum tanque cadastrado</Text>
                        <Text style={styles.emptyText}>Comece criando seu primeiro tanque</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.fab} onPress={() => setAddVisible(true)}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <AddTankModal visible={addVisible} onClose={() => setAddVisible(false)} onAdd={addTank} />
            <EditTankModal visible={editVisible} tank={selected} onClose={closeEdit} onEdit={editTank} />
            <ConfirmDeleteModal
                visible={deleteVisible}
                title="Deletar Tanque"
                message={`Tem certeza que deseja deletar o tanque "${selected?.name}"? Esta ação não pode ser desfeita.`}
                onConfirm={handleDelete}
                onCancel={cancelDelete}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 12, color: '#666' },
    listContent: { padding: 20, flexGrow: 1 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
    emptyIcon: { fontSize: 64, marginBottom: 16 },
    emptyTitle: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 8 },
    emptyText: { fontSize: 16, color: '#666', textAlign: 'center' },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    fabText: { fontSize: 32, color: '#fff', fontWeight: 'bold' },
});
