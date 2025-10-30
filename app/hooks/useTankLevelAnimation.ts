import { useEffect } from 'react';
import { getLevelColor } from '../utils/colorUtils';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function useTankLevelAnimation(level: number | null) {
    const levelWidth = useSharedValue(0);

    const animatedBarStyle = useAnimatedStyle(() => {
        const levelColor = level !== null ? getLevelColor(level) : '#0066cc';
        return {
            width: `${levelWidth.value}%`,
            backgroundColor: levelColor,
        };
    });

    useEffect(() => {
        if (level !== null) {
            levelWidth.value = withTiming(level, {
                duration: 1500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
        }
    }, [level]);

    return { animatedBarStyle };
}
