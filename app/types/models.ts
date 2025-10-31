export interface Tank {
    id: number;
    name: string;
    ph?: number;
    temperature?: number;
    ammonia?: number;
    nitrite?: number;
    createdAt: Date;
}

export interface Fish {
    id: number;
    species: string;
    age: number;
    size: number;
    tankId?: number;
    createdAt: Date;
}

export interface Supply {
    id: number;
    name: string;
    quantity: number;
    createdAt: Date;
}
