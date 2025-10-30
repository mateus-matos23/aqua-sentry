import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fish } from '../types/Fish';

interface FishCardProps {
    fish: Fish;
    onDelete: (id: string) => void;
}

export function FishCard({ fish, onDelete }: FishCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <Text style={styles.species}>{fish.species}</Text>
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
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(fish.id)}
            >
                <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
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
    species: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
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
    deleteButton: {
        padding: 8,
    },
    deleteButtonText: {
        fontSize: 24,
    },
});
