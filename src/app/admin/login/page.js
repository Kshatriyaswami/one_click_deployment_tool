"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('isAdmin', 'true');
                router.push('/admin/dashboard');
            } else {
                setError(data.error || 'Login failed');
                setIsLoading(false);
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center relative px-4">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

            <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                {/* Neon Top Border */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-500/10 p-5 rounded-3xl mb-6 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                        <Shield size={48} className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    </div>
                    <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Admin Portal</h1>
                    <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Restricted Access
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm font-semibold ml-1">Master Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono tracking-widest"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium text-center animate-fade-in">
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>Authenticate <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-gray-500 font-mono">Demo Credentials: admin123</p>
                </div>
            </div>
        </div>
    );
}
