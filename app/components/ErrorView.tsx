import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorViewProps {
    message: string;
}

export function ErrorView({ message }: ErrorViewProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>⚠️</Text>
            <Text style={styles.title}>Erro</Text>
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.hint}>Arraste para baixo para atualizar</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: 400,
    },
    icon: {
        fontSize: 48,
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#d32f2f',
        marginBottom: 8,
    },
    message: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 8,
    },
    hint: {
        fontSize: 14,
        color: '#999999',
        fontStyle: 'italic',
    },
});
