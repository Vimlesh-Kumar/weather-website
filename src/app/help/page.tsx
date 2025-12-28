export default function Help() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
          Help & Support
        </h1>
        
        <div className="space-y-4">
           <div className="p-4 rounded-xl bg-white/5 border border-white/10">
               <h3 className="font-semibold text-lg text-emerald-300 mb-2">How to manage this app?</h3>
               <p className="text-white/80">
                 This page helps us to manage this app. If you are experiencing issues, try clearing your cache or checking your internet connection.
               </p>
           </div>
           
           <div className="p-4 rounded-xl bg-white/5 border border-white/10">
               <h3 className="font-semibold text-lg text-emerald-300 mb-2">Search Tips</h3>
               <p className="text-white/80">
                 Enter your city name in the search bar to get the latest forecast. You can try specific locations like &quot;London, UK&quot; for better accuracy.
               </p>
           </div>
        </div>
      </div>
    </main>
  );
}
