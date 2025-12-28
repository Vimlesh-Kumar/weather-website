'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { Search, MapPin, Wind, Droplets, Thermometer, CloudRain, Sun } from 'lucide-react';

interface WeatherData {
  location: string;
  forecast: {
    description: string;
    temperature: number;
    feelslike: number;
    humidity: number;
    wind_speed: number;
    precip: number;
    icon?: string;
    is_day: string;
  };
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?address=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (res.status !== 200 || data.error) {
        setError(data.error || 'Something went wrong');
      } else {
        setWeather(data);
      }
    } catch {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const isDay = weather?.forecast?.is_day === 'yes';

  const getGradient = () => {
      if (!weather) return 'bg-gradient-to-br from-gray-900 to-gray-800';
      if (isDay) return 'bg-gradient-to-br from-blue-400 via-sky-300 to-blue-100';
      return 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800';
  };

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-700 ease-in-out ${getGradient()}`}>

      {!weather && (
          <div className="mb-12 text-center animate-fade-in-up">
              <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">Visual Weather</h1>
              <p className="text-white/60 text-lg">Experience the forecast like never before.</p>
          </div>
      )}

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl mb-8 transition-all duration-500 hover:shadow-3xl hover:bg-white/15">

        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            placeholder="Search city (e.g. London)..."
            className="w-full pl-6 pr-12 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all font-medium shadow-inner"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-all disabled:opacity-50 active:scale-95"
          >
            {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
                <Search size={20} />
            )}
          </button>
        </form>

        {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-100 text-sm flex items-center justify-center font-medium animate-pulse">
                {error}
            </div>
        )}
      </div>

      {weather && (
        <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-3xl shadow-2xl text-white animate-fade-in-up ring-1 ring-white/20">

          <div className="flex items-start justify-between mb-8">
            <div>
                <div className="flex items-center gap-1.5 text-white/80 mb-1">
                    <MapPin size={16} />
                    <span className="text-xs font-bold tracking-widest uppercase opacity-80">Current Location</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight drop-shadow-md">{weather.location}</h2>
            </div>
            <div className="bg-white/20 p-2.5 rounded-2xl shadow-lg ring-1 ring-white/10">
                {/* Use API icon or fallback */}
               {weather.forecast.icon ? (
                 <NextImage 
                    src={weather.forecast.icon} 
                    alt={weather.forecast.description} 
                    width={48} 
                    height={48} 
                    className="object-contain" // w-12 h-12 is 48px
                    unoptimized
                 />
               ) : (
                 <Sun size={32} />
               )}
            </div>
          </div>

          <div className="flex flex-col items-center mb-10 relative">
            <div className="text-8xl font-black tracking-tighter mb-2 drop-shadow-xl relative z-10">
                {weather.forecast.temperature}°
            </div>
            <p className="text-xl font-medium text-white/90 capitalize px-4 py-1 rounded-full bg-white/10 border border-white/10 shadow-sm backdrop-blur-sm">
                {weather.forecast.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 hover:bg-white/15 transition-colors p-4 rounded-2xl flex items-center gap-4 border border-white/5 shadow-sm">
                <Thermometer className="text-yellow-300 w-8 h-8" strokeWidth={1.5} />
                <div>
                    <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Feels Like</p>
                    <p className="text-lg font-bold">{weather.forecast.feelslike}°</p>
                </div>
            </div>
            <div className="bg-white/10 hover:bg-white/15 transition-colors p-4 rounded-2xl flex items-center gap-4 border border-white/5 shadow-sm">
                <Droplets className="text-blue-300 w-8 h-8" strokeWidth={1.5} />
                <div>
                    <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Humidity</p>
                    <p className="text-lg font-bold">{weather.forecast.humidity}%</p>
                </div>
            </div>
            <div className="bg-white/10 hover:bg-white/15 transition-colors p-4 rounded-2xl flex items-center gap-4 border border-white/5 shadow-sm">
                <Wind className="text-teal-300 w-8 h-8" strokeWidth={1.5} />
                <div>
                    <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Wind</p>
                    <p className="text-lg font-bold">{weather.forecast.wind_speed} <span className="text-xs font-normal opacity-70">km/h</span></p>
                </div>
            </div>
             <div className="bg-white/10 hover:bg-white/15 transition-colors p-4 rounded-2xl flex items-center gap-4 border border-white/5 shadow-sm">
                <CloudRain className="text-indigo-300 w-8 h-8" strokeWidth={1.5} />
                <div>
                    <p className="text-[10px] text-white/60 uppercase font-bold tracking-wider">Precip</p>
                    <p className="text-lg font-bold">{weather.forecast.precip}%</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
