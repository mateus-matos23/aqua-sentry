import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function LoadingView() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0066cc" />
            <Text style={styles.text}>Carregando nível do tanque...</Text>
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
    text: {
        marginTop: 12,
        fontSize: 16,
        color: '#666666',
    },
});
