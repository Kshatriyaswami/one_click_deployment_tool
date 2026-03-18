"use client";

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import DeploymentForm from '@/components/DeploymentForm';
import StatusPanel from '@/components/StatusPanel';
import HistoryTable from '@/components/HistoryTable';

export default function Home() {
  const [deploymentStatus, setDeploymentStatus] = useState(null);
  const [history, setHistory] = useState([]);
  const pollIntervalRef = useRef(null);

  // Load from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('sessionDeployments');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const saveToSession = (newHistory) => {
    sessionStorage.setItem('sessionDeployments', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const handleDeploy = async (repoUrl, platform, authToken, repoId) => {
    try {
      setDeploymentStatus({ status: 'cloning', logs: ['Initializing...'], repoUrl, platform });

      const res = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, platform, authToken, repoId }),
      });

      const data = await res.json();

      if (res.ok) {
        // Add optimistic initial record to session history
        const initialRecord = {
          id: data.id,
          repoUrl,
          platform,
          status: 'cloning',
          timestamp: new Date().toISOString(),
          url: null
        };
        saveToSession([initialRecord, ...history]);
        startPolling(data.id);
      } else {
        setDeploymentStatus(prev => ({ ...prev, status: 'failure', logs: [...prev.logs, `Error: ${data.error}`] }));
      }
    } catch (err) {
      setDeploymentStatus(prev => ({ ...prev, status: 'failure', logs: [...prev.logs, `Error: ${err.message}`] }));
    }
  };

  const startPolling = (id) => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/status?id=${id}`);
        const data = await res.json();

        if (res.ok) {
          setDeploymentStatus({
            id: data.id,
            status: data.status,
            logs: data.logs || [],
            url: data.url,
            repoUrl: data.repoUrl,
            platform: data.platform
          });

          // Update session history
          setHistory(prevHistory => {
            const updated = prevHistory.map(item => 
              item.id === id ? { ...item, status: data.status, url: data.url } : item
            );
            sessionStorage.setItem('sessionDeployments', JSON.stringify(updated));
            return updated;
          });

          if (data.status === 'success' || data.status === 'failure') {
            clearInterval(pollIntervalRef.current);
          }
        }
      } catch (err) {
        console.error('Polling error', err);
      }
    }, 1000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this deployment from your session view?')) return;
    const filtered = history.filter(item => item.id !== id);
    saveToSession(filtered);
  };

  return (
    <main className="container">
      <Header />
      <DeploymentForm onDeploy={handleDeploy} />
      
      {deploymentStatus && (
        <StatusPanel
          status={deploymentStatus.status}
          logs={deploymentStatus.logs}
          url={deploymentStatus.url}
        />
      )}

      {history.length > 0 ? (
        <HistoryTable history={history} onDelete={handleDelete} />
      ) : (
        <div className="text-center mt-12 text-gray-500 border border-gray-800 p-8 rounded-xl bg-gray-900/50">
          <p>No deployments in this session yet. Submit a repository above to get started!</p>
        </div>
      )}
    </main>
  );
}
