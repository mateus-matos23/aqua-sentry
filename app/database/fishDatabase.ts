import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { Fish, Supply, Tank } from '../types/Fish';

const DATABASE_NAME = 'aquasentry.db';

let db: SQLiteDatabase | null = null;
let initPromise: Promise<void> | null = null;

export async function initDatabase() {
    if (db) {
        console.log('Database already initialized');
        return;
    }

    if (initPromise) {
        console.log('Database initialization in progress, waiting...');
        return initPromise;
    }

    initPromise = (async () => {
        try {
            console.log('Opening database...');
            db = await openDatabaseAsync(DATABASE_NAME);
            console.log('Database opened successfully');

            // Dropar as tabelas antigas se existirem (para corrigir o schema)
            await db.execAsync('DROP TABLE IF EXISTS fishes;');
            await db.execAsync('DROP TABLE IF EXISTS tanks;');
            await db.execAsync('DROP TABLE IF EXISTS supplies;');
            console.log('Dropped old tables');

            // Criar tabela de tanques
            await db.execAsync(`
                CREATE TABLE tanks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    ph REAL,
                    temperature REAL,
                    ammonia REAL,
                    nitrite REAL,
                    createdAt TEXT NOT NULL
                );
            `);
            console.log('Tanks table created');

            // Criar tabela de peixes com relacionamento
            await db.execAsync(`
                CREATE TABLE fishes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    species TEXT NOT NULL,
                    age INTEGER NOT NULL,
                    size REAL NOT NULL,
                    tankId INTEGER,
                    createdAt TEXT NOT NULL,
                    FOREIGN KEY (tankId) REFERENCES tanks(id) ON DELETE SET NULL
                );
            `);
            console.log('Fishes table created');

            // Criar tabela de insumos
            await db.execAsync(`
                CREATE TABLE supplies (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    quantity REAL NOT NULL,
                    createdAt TEXT NOT NULL
                );
            `);
            console.log('Supplies table created');

            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Error initializing database:', error);
            db = null;
            initPromise = null;
            throw error;
        }
    })();

    return initPromise;
}

export async function createFish(species: string, age: number, size: number, tankId?: number): Promise<Fish> {
    if (!db) throw new Error('Database not initialized');

    const createdAt = new Date();
    console.log('🐟 Creating fish:', { species, age, size, tankId });

    try {
        const result = await db.runAsync(
            'INSERT INTO fishes (species, age, size, tankId, createdAt) VALUES (?, ?, ?, ?, ?)',
            [species, age, size, tankId ?? null, createdAt.toISOString()]
        );

        const newFish: Fish = {
            id: result.lastInsertRowId,
            species,
            age,
            size,
            tankId: tankId ?? undefined,
            createdAt,
        };

        console.log('✅ Fish created successfully:', newFish);
        return newFish;
    } catch (error) {
        console.error('Error creating fish:', error);
        throw error;
    }
}

export async function getAllFishes(): Promise<Fish[]> {
    if (!db) throw new Error('Database not initialized');

    try {
        const result = await db.getAllAsync<{
            id: number;
            species: string;
            age: number;
            size: number;
            tankId: number | null;
            createdAt: string;
        }>('SELECT * FROM fishes ORDER BY createdAt DESC');

        return result.map((row) => ({
            id: row.id,
            species: row.species,
            age: row.age,
            size: row.size,
            tankId: row.tankId ?? undefined,
            createdAt: new Date(row.createdAt),
        }));
    } catch (error) {
        console.error('Error getting all fishes:', error);
        throw error;
    }
}

export async function updateFish(id: number, species: string, age: number, size: number, tankId?: number): Promise<void> {
    if (!db) throw new Error('Database not initialized');

    try {
        await db.runAsync(
            'UPDATE fishes SET species = ?, age = ?, size = ?, tankId = ? WHERE id = ?',
            [species, age, size, tankId ?? null, id]
        );
    } catch (error) {
        console.error('Error updating fish:', error);
        throw error;
    }
}

export async function deleteFish(id: number): Promise<void> {
    if (!db) throw new Error('Database not initialized');

    try {
        await db.runAsync('DELETE FROM fishes WHERE id = ?', [id]);
    } catch (error) {
        console.error('Error deleting fish:', error);
        throw error;
    }
}

export async function getFishById(id: number): Promise<Fish | null> {
    if (!db) throw new Error('Database not initialized');

    try {
        const result = await db.getFirstAsync<{
            id: number;
            species: string;
            age: number;
            size: number;
            tankId: number | null;
            createdAt: string;
        }>('SELECT * FROM fishes WHERE id = ?', [id]);

        if (!result) return null;

        return {
            id: result.id,
            species: result.species,
            age: result.age,
            size: result.size,
            tankId: result.tankId ?? undefined,
            createdAt: new Date(result.createdAt),
        };
    } catch (error) {
        console.error('Error getting fish by id:', error);
        throw error;
    }
}

// Função de debug para verificar o schema das tabelas
export async function debugDatabaseSchema() {
    if (!db) throw new Error('Database not initialized');

    try {
        const tables = await db.getAllAsync<{ name: string }>(
            "SELECT name FROM sqlite_master WHERE type='table'"
        );
        console.log('📊 Tables in database:', tables);

        const fishCount = await db.getFirstAsync<{ count: number }>(
            'SELECT COUNT(*) as count FROM fishes'
        );
        console.log('🐟 Total fishes:', fishCount?.count);

        const tankCount = await db.getFirstAsync<{ count: number }>(
            'SELECT COUNT(*) as count FROM tanks'
        );
        console.log('🏊 Total tanks:', tankCount?.count);

        const supplyCount = await db.getFirstAsync<{ count: number }>(
            'SELECT COUNT(*) as count FROM supplies'
        );
        console.log('📦 Total supplies:', supplyCount?.count);
    } catch (error) {
        console.error('Error debugging database:', error);
    }
}

/* ------------------------ Tanks CRUD ------------------------ */
export async function createTank(
    name: string,
    ph?: number,
    temperature?: number,
    ammonia?: number,
    nitrite?: number
): Promise<Tank> {
    if (!db) throw new Error('Database not initialized');

    const createdAt = new Date();

    try {
        const result = await db.runAsync(
            'INSERT INTO tanks (name, ph, temperature, ammonia, nitrite, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
            [name, ph ?? null, temperature ?? null, ammonia ?? null, nitrite ?? null, createdAt.toISOString()]
        );

        const newTank: Tank = {
            id: result.lastInsertRowId,
            name,
            ph,
            temperature,
            ammonia,
            nitrite,
            createdAt,
        };

        return newTank;
    } catch (error) {
        console.error('Error creating tank:', error);
        throw error;
    }
}

export async function getAllTanks(): Promise<Tank[]> {
    if (!db) throw new Error('Database not initialized');

    try {
        const result = await db.getAllAsync<{
            id: number;
            name: string;
            ph: number | null;
            temperature: number | null;
            ammonia: number | null;
            nitrite: number | null;
            createdAt: string;
        }>('SELECT * FROM tanks ORDER BY createdAt DESC');

        return result.map((row) => ({
            id: row.id,
            name: row.name,
            ph: row.ph ?? undefined,
            temperature: row.temperature ?? undefined,
            ammonia: row.ammonia ?? undefined,
            nitrite: row.nitrite ?? undefined,
            createdAt: new Date(row.createdAt),
        }));
    } catch (error) {
        console.error('Error getting all tanks:', error);
        throw error;
    }
}

export async function updateTank(
    id: number,
    name: string,
    ph?: number,
    temperature?: number,
    ammonia?: number,
    nitrite?: number
): Promise<void> {
    if (!db) throw new Error('Database not initialized');

    try {
        await db.runAsync(
            'UPDATE tanks SET name = ?, ph = ?, temperature = ?, ammonia = ?, nitrite = ? WHERE id = ?',
            [name, ph ?? null, temperature ?? null, ammonia ?? null, nitrite ?? null, id]
        );
    } catch (error) {
        console.error('Error updating tank:', error);
        throw error;
    }
}

export async function deleteTank(id: number): Promise<void> {
    if (!db) throw new Error('Database not initialized');

    try {
        // When deleting a tank, set related fishes' tankId to NULL due to FK ON DELETE SET NULL
        await db.runAsync('DELETE FROM tanks WHERE id = ?', [id]);
    } catch (error) {
        console.error('Error deleting tank:', error);
        throw error;
    }
}

export async function getTankById(id: number): Promise<Tank | null> {
    if (!db) throw new Error('Database not initialized');

    try {
        const result = await db.getFirstAsync<{
            id: number;
            name: string;
            ph: number | null;
            temperature: number | null;
            ammonia: number | null;
            nitrite: number | null;
            createdAt: string;
        }>('SELECT * FROM tanks WHERE id = ?', [id]);

        if (!result) return null;

        return {
            id: result.id,
            name: result.name,
            ph: result.ph ?? undefined,
            temperature: result.temperature ?? undefined,
            ammonia: result.ammonia ?? undefined,
            nitrite: result.nitrite ?? undefined,
            createdAt: new Date(result.createdAt),
        };
    } catch (error) {
        console.error('Error getting tank by id:', error);
        throw error;
    }
}

export async function getFishCountByTankId(tankId: number): Promise<number> {
    if (!db) throw new Error('Database not initialized');

    try {
        const result = await db.getFirstAsync<{ count: number }>(
            'SELECT COUNT(*) as count FROM fishes WHERE tankId = ?',
            [tankId]
        );
        console.log(`🐟 Count for tank ${tankId}:`, result?.count ?? 0);
        return result?.count ?? 0;
    } catch (error) {
        console.error('Error getting fish count by tank id:', error);
        throw error;
    }
}

/* ------------------------ Supplies CRUD (placeholder) ------------------------ */
export async function createSupply(name: string, quantity: number): Promise<Supply> {
    if (!db) throw new Error('Database not initialized');
    const createdAt = new Date();
    try {
        const result = await db.runAsync(
            'INSERT INTO supplies (name, quantity, createdAt) VALUES (?, ?, ?)',
            [name, quantity, createdAt.toISOString()]
        );
        const newSupply: Supply = {
            id: result.lastInsertRowId,
            name,
            quantity,
            createdAt,
        };
        return newSupply;
    } catch (error) {
        console.error('Error creating supply:', error);
        throw error;
    }
}

