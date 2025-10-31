import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fish } from '../types/Fish';

interface FishCardProps {
    fish: Fish;
    tankName?: string;
    onDelete: (id: number) => void;
    onEdit: (fish: Fish) => void;
}

export function FishCard({ fish, tankName, onDelete, onEdit }: FishCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.species}>{fish.species}</Text>
                    {tankName && (
                        <View style={styles.tankBadge}>
                            <Text style={styles.tankBadgeText}>🪣 {tankName}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Idade:</Text>
                        <Text style={styles.infoValue}>{fish.age} meses</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Tamanho:</Text>
                        <Text style={styles.infoValue}>{fish.size} cm</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => onEdit(fish)}
                >
                    <Text style={styles.editButtonText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(fish.id)}
                >
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        gap: 8,
    },
    species: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        flex: 1,
    },
    tankBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tankBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4CAF50',
    },
    infoContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 14,
        color: '#666666',
        marginRight: 4,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    editButton: {
        padding: 8,
    },
    editButtonText: {
        fontSize: 24,
    },
    deleteButton: {
        padding: 8,
    },
    deleteButtonText: {
        fontSize: 24,
    },
});
