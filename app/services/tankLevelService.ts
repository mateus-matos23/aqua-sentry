const API_BASE_URL = 'https://profgeorgevagner.github.io/data.json';

export interface TankLevelResponse {
    level: number;
}

export async function fetchTankLevel(){
    const timestamp = Date.now();
    const url = `${API_BASE_URL}?t=${timestamp}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: TankLevelResponse = await response.json();

    if (typeof data.level !== 'number') {
        throw new Error('Formato de dados inválido: nível não encontrado');
    }

    return data;
}
