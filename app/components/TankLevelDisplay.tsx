import React from 'react';
import Animated from 'react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native';
import { getLevelStatusText, getLevelTextColor } from '../utils/colorUtils';

interface TankLevelDisplayProps {
    level: number;
    animatedBarStyle: any;
    lastUpdate: Date | null;
}

export function TankLevelDisplay({ level, animatedBarStyle, lastUpdate }: TankLevelDisplayProps) {
    const textColor = getLevelTextColor(level);
    const statusText = getLevelStatusText(level);
    const formattedLastUpdate = lastUpdate ? lastUpdate.toLocaleString('pt-BR') : '--';

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Nível do Tanque de Água</Text>

                <View style={styles.levelContainer}>
                    <Text style={[styles.levelValue, { color: textColor }]}>{level}</Text>
                    <Text style={styles.levelUnit}>%</Text>
                </View>

                <View style={styles.progressBarContainer}>
                    <Animated.View style={[styles.progressBar, animatedBarStyle]} />
                </View>

                <Text style={styles.statusText}>{statusText}</Text>
            </View>

            <Text style={styles.lastUpdate}>
                Última atualização: {formattedLastUpdate}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 24,
        textAlign: 'center',
    },
    levelContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 24,
    },
    levelValue: {
        fontSize: 72,
        fontWeight: 'bold',
        lineHeight: 72,
    },
    levelUnit: {
        fontSize: 32,
        fontWeight: '600',
        color: '#666666',
        marginLeft: 4,
    },
    progressBarContainer: {
        width: '100%',
        height: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
    },
    progressBar: {
        height: '100%',
        borderRadius: 8,
    },
    statusText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    lastUpdate: {
        fontSize: 12,
        color: '#999999',
        textAlign: 'center',
        marginTop: 16,
    },
});
