export function getLevelColor(level: number): string {
    'worklet';
    if (level >= 75) return '#4CAF50'; // Verde - 75-100%
    if (level >= 50) return '#2196F3'; // Azul - 50-74%
    if (level >= 25) return '#FF9800'; // Laranja - 25-49%
    return '#F44336'; // Vermelho - 0-24%
}

export function getLevelTextColor(level: number): string {
    'worklet';
    if (level >= 75) return '#4CAF50';
    if (level >= 50) return '#2196F3';
    if (level >= 25) return '#FF9800';
    return '#F44336';
}

export function getLevelStatusText(level: number): string {
    if (level >= 75) return '✓ Nível adequado';
    if (level >= 50) return '✓ Nível bom';
    if (level >= 25) return '⚠ Nível moderado';
    return '⚠️ Nível baixo';
}
