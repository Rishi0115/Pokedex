import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <>
      <div id="stars" />
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-4">
        
        {/* Login Card */}
        <div className="w-full max-w-md animate-fadeSlideIn">
          
          {/* Glassmorphic Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative overflow-hidden">
            
            {/* Gradient glow behind card */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-red-500/30 to-yellow-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            
            {/* Pokéball Icon */}
            <div className="flex justify-center mb-6 relative z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-red-500 to-red-700 relative shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-[float_3s_ease-in-out_infinite]">
                {/* Top half */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-400 to-red-600 rounded-t-full" />
                {/* Bottom half */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-gray-200 rounded-b-full" />
                {/* Center line */}
                <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-[#333] -translate-y-1/2 z-10" />
                {/* Center button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-[3px] border-[#333] z-20 shadow-inner" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2 font-[var(--font-poppins)] tracking-wide relative z-10 drop-shadow-lg">
              Pokédex
            </h1>
            <p className="text-center text-white/50 text-sm mb-8 font-[var(--font-poppins)] relative z-10">
              Sign in to catch 'em all
            </p>

            {/* Google Sign In Button */}
            <button
              onClick={login}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative z-10 group"
            >
              {/* Google Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm tracking-wide">Sign in with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center my-6 relative z-10">
              <div className="flex-1 h-px bg-white/10" />
              <span className="px-4 text-white/30 text-xs uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Guest mode hint */}
            <p className="text-center text-white/30 text-xs font-[var(--font-poppins)] relative z-10">
              Authentication is required to save favorites<br />and personalize your Pokédex experience
            </p>
          </div>

          {/* Footer text */}
          <p className="text-center text-white/20 text-xs mt-6 font-[var(--font-poppins)]">
            Built with ❤️ using MERN Stack
          </p>
        </div>
      </div>
    </>
  );
}
