
const MAPBOX_TOKEN = 'pk.eyJ1IjoidmltbGVzaDExIiwiYSI6ImNsZTg1MmoyYzA3N2Ezb2xyd3J3ZGNydjgifQ.uo1901s0_uIF82LCghKx7Q';
const WEATHERSTACK_KEY = '7fbebbb0bf2e8ad9d067374498175dfe';

export interface GeocodeResult {
    latitude: number;
    longitude: number;
    location: string;
}

export interface ForecastResult {
    description: string;
    temperature: number;
    feelslike: number;
    humidity: number;
    wind_speed: number;
    precip: number;
    icon?: string;
    is_day?: string;
}

export async function geocode(address: string): Promise<GeocodeResult> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Unable to connect to location services.');
    }

    const data = await res.json();

    if (!data.features || data.features.length === 0) {
        throw new Error('Unable to find location. Try another search.');
    }

    const feature = data.features[0];
    return {
        latitude: feature.center[1],
        longitude: feature.center[0],
        location: feature.place_name,
    };
}

export async function forecast(latitude: number, longitude: number): Promise<ForecastResult> {
    const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${latitude},${longitude}`;
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();

    if (data.error) {
        throw new Error('Unable to fetch forecast data from weather service.');
    }

    const current = data.current;

    return {
        description: current.weather_descriptions[0],
        temperature: current.temperature,
        feelslike: current.feelslike,
        humidity: current.humidity,
        wind_speed: current.wind_speed,
        precip: current.precip,
        icon: current.weather_icons[0],
        is_day: current.is_day
    };
}
