import NextImage from 'next/image';

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">
          About This App
        </h1>
        
        <p className="text-lg text-white/80 leading-relaxed mb-8">
          This weather app is one of the best free weather apps with full features: 
          Local weather, weather map service, and weather widgets. 
          Forecastle: Forecast now, hourly forecast and daily forecast app.
        </p>

        <div className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-sky-400/50 shadow-lg shrink-0">
             <NextImage 
               src="/img/pic3.jpg" 
               alt="Vimlesh Kumar"
               fill
               className="object-cover"
             />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-sky-300 font-bold mb-1">Created By</p>
            <h2 className="text-2xl font-bold text-white">Vimlesh Kumar</h2>
            <p className="text-sm text-white/50 mt-1">Full Stack Developer</p>
          </div>
        </div>
      </div>
    </main>
  );
}
