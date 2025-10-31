import { useEffect, useState } from 'react';
import {
    createTank,
    deleteTank as deleteTankFromDB,
    getAllTanks,
    initDatabase,
    updateTank,
} from '../database/fishDatabase';
import { Tank } from '../types/Fish';

export function useTanks() {
    const [tanks, setTanks] = useState<Tank[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initializeAndLoad();
    }, []);

    async function initializeAndLoad() {
        try {
            await initDatabase();
            await loadTanks();
        } catch (error) {
            console.error('Error initializing tanks:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function loadTanks() {
        try {
            const all = await getAllTanks();
            setTanks(all);
        } catch (error) {
            console.error('Error loading tanks:', error);
        }
    }

    async function addTank(name: string, ph?: number, temperature?: number, ammonia?: number, nitrite?: number) {
        try {
            await initDatabase();
            const t = await createTank(name, ph, temperature, ammonia, nitrite);
            setTanks((prev) => [t, ...prev]);
        } catch (error) {
            console.error('Error adding tank:', error);
            throw error;
        }
    }

    async function editTank(id: number, name: string, ph?: number, temperature?: number, ammonia?: number, nitrite?: number) {
        try {
            await initDatabase();
            await updateTank(id, name, ph, temperature, ammonia, nitrite);
            setTanks((prev) => prev.map((t) => (t.id === id ? { ...t, name, ph, temperature, ammonia, nitrite } : t)));
        } catch (error) {
            console.error('Error editing tank:', error);
            throw error;
        }
    }

    async function deleteTank(id: number) {
        try {
            await initDatabase();
            await deleteTankFromDB(id);
            setTanks((prev) => prev.filter((t) => t.id !== id));
        } catch (error) {
            console.error('Error deleting tank:', error);
            throw error;
        }
    }

    return {
        tanks,
        isLoading,
        addTank,
        editTank,
        deleteTank,
        refresh: loadTanks,
    };
}
