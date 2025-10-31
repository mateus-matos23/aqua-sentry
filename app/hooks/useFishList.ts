import { useEffect, useState } from 'react';
import {
    createFish,
    debugDatabaseSchema,
    deleteFish as deleteFishFromDB,
    getAllFishes,
    initDatabase,
    updateFish,
} from '../database/fishDatabase';
import { Fish } from '../types/Fish';

export function useFishList() {
    const [fishes, setFishes] = useState<Fish[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initializeDatabaseAndLoadFishes();
    }, []);

    async function initializeDatabaseAndLoadFishes() {
        try {
            await initDatabase();
            await debugDatabaseSchema(); // Debug: ver schema e dados
            await loadFishes();
        } catch (error) {
            console.error('Error initializing database:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function loadFishes() {
        try {
            const allFishes = await getAllFishes();
            setFishes(allFishes);
        } catch (error) {
            console.error('Error loading fishes:', error);
        }
    }

    async function addFish(species: string, age: number, size: number, tankId?: number) {
        try {
            await initDatabase(); // Garantir que o DB está inicializado
            const newFish = await createFish(species, age, size, tankId);
            setFishes((prev) => [newFish, ...prev]);
        } catch (error) {
            console.error('Error adding fish:', error);
            throw error;
        }
    }

    async function editFish(id: number, species: string, age: number, size: number, tankId?: number) {
        try {
            await initDatabase(); // Garantir que o DB está inicializado
            await updateFish(id, species, age, size, tankId);
            setFishes((prev) =>
                prev.map((fish) =>
                    fish.id === id ? { ...fish, species, age, size, tankId } : fish
                )
            );
        } catch (error) {
            console.error('Error updating fish:', error);
            throw error;
        }
    }

    async function deleteFish(id: number) {
        try {
            await initDatabase(); // Garantir que o DB está inicializado
            await deleteFishFromDB(id);
            setFishes((prev) => prev.filter((fish) => fish.id !== id));
        } catch (error) {
            console.error('Error deleting fish:', error);
            throw error;
        }
    }

    return {
        fishes,
        isLoading,
        addFish,
        editFish,
        deleteFish,
        refreshFishes: loadFishes,
    };
}
