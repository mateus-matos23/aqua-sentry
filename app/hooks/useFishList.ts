import { useState } from 'react';
import { Fish } from '../types/Fish';

export function useFishList() {
    const [fishes, setFishes] = useState<Fish[]>([]);

    function addFish(species: string, age: number, size: number) {
        const newFish: Fish = {
            id: Date.now().toString(),
            species,
            age,
            size,
            createdAt: new Date(),
        };
        setFishes((prev) => [...prev, newFish]);
    }

    function deleteFish(id: string) {
        setFishes((prev) => prev.filter((fish) => fish.id !== id));
    }

    return {
        fishes,
        addFish,
        deleteFish,
    };
}
