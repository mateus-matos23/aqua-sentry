import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tank } from '../types/Fish';

interface TankCardProps {
    tank: Tank;
    fishCount?: number;
    onDelete: (id: number) => void;
    onEdit: (tank: Tank) => void;
}

export function TankCard({ tank, fishCount, onDelete, onEdit }: TankCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{tank.name}</Text>
                    {fishCount !== undefined && (
                        <View style={styles.fishBadge}>
                            <Text style={styles.fishBadgeText}>🐟 {fishCount}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>pH:</Text>
                        <Text style={styles.infoValue}>{tank.ph ?? '—'}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Temperatura:</Text>
                        <Text style={styles.infoValue}>{tank.temperature ?? '—'}°C</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Amônia:</Text>
                        <Text style={styles.infoValue}>{tank.ammonia ?? '—'}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Nitrito:</Text>
                        <Text style={styles.infoValue}>{tank.nitrite ?? '—'}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.edit} onPress={() => onEdit(tank)}>
                    <Text style={styles.actionText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.delete} onPress={() => onDelete(tank.id)}>
                    <Text style={styles.actionText}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    content: {
        flex: 1,
        marginRight: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        flex: 1,
    },
    fishBadge: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    fishBadgeText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2196F3',
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: '45%',
    },
    infoLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
        marginRight: 4,
    },
    infoValue: {
        fontSize: 13,
        color: '#333',
    },
    actions: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    edit: { padding: 8 },
    delete: { padding: 8 },
    actionText: { fontSize: 20 },
});
