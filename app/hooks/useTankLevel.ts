import { useEffect, useState } from 'react';
import { fetchTankLevel } from '../services/tankLevelService';

const REFRESH_INTERVAL = 5000; // 5 seconds

export function useTankLevel() {
    const [level, setLevel] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    async function loadTankLevel() {
        try {
            setError(null);
            const data = await fetchTankLevel();
            setLevel(data.level);
            setLastUpdate(new Date());
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Falha ao buscar nível do tanque';
            setError(errorMessage);
            console.error('Error fetching tank level:', err);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    function handleRefresh() {
        setRefreshing(true);
        loadTankLevel();
    }

    useEffect(() => {
        loadTankLevel();

        const interval = setInterval(() => {
            loadTankLevel();
        }, REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return {
        level,
        isLoading,
        error,
        refreshing,
        lastUpdate,
        onRefresh: handleRefresh,
    };
}
