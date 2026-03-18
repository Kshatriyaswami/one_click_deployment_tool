"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, LogOut, Activity, Server } from 'lucide-react';
import HistoryTable from '@/components/HistoryTable';
import CloneTable from '@/components/CloneTable';

export default function AdminDashboardPage() {
  const [history, setHistory] = useState([]);
  const [clones, setClones] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Basic client-side auth check
    const auth = localStorage.getItem('isAdmin');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    // Fetch Global History
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      setHistory(data.history || []);
    } catch (err) { console.error(err); }

    // Fetch Global Clones
    try {
      const res = await fetch('/api/clones');
      const data = await res.json();
      setClones(data.clones || []);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this deployment history?')) return;
    try {
      await fetch(`/api/history?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleDeleteClone = async (id) => {
    if (!confirm('Are you sure you want to delete this cloned repository from the server?')) return;
    try {
      await fetch(`/api/clones?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error('Delete clone failed', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  if (!isAuthenticated) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
       <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
       <p className="text-gray-400 font-mono animate-pulse">Verifying credentials...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto mt-4 mb-20 px-4 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full point-events-none -z-10"></div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl mb-12 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="flex items-center gap-5 mb-4 md:mb-0">
          <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:scale-105 transition-transform duration-500">
             <Shield size={36} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Admin Area</h1>
            <p className="text-gray-400 text-sm mt-1 font-medium flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> System Online
            </p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]"
        >
          <LogOut size={18} /> Terminate Session
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
         <div className="bg-gray-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex items-center gap-4 hover:bg-gray-900/60 transition-colors">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                <Activity size={24} />
            </div>
            <div>
                <p className="text-gray-400 text-sm font-medium">Total Deployments</p>
                <h3 className="text-3xl font-bold text-white">{history.length}</h3>
            </div>
         </div>
         <div className="bg-gray-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex items-center gap-4 hover:bg-gray-900/60 transition-colors">
            <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-yellow-400">
                <Server size={24} />
            </div>
            <div>
                <p className="text-gray-400 text-sm font-medium">Active Clones Configured</p>
                <h3 className="text-3xl font-bold text-white">{clones.length}</h3>
            </div>
         </div>
      </div>

      {/* Tables */}
      <div className="space-y-16">
        <section>
          <HistoryTable history={history} onDelete={handleDelete} />
        </section>

        <section>
          <CloneTable clones={clones} onDelete={handleDeleteClone} />
        </section>
      </div>
    </div>
  );
}
