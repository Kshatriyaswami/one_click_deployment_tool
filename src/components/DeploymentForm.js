"use client";

import { useState, useEffect } from 'react';
import { Github, Play, Globe, AlertCircle, Key, Check, Loader2, X } from 'lucide-react';

export default function DeploymentForm({ onDeploy }) {
    const [repoUrl, setRepoUrl] = useState('');
    const [repoId, setRepoId] = useState(null); // New state for GitHub Repo ID
    const [platform, setPlatform] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [loading, setLoading] = useState(false); // Deployment loading
    const [verifying, setVerifying] = useState(false); // Repo verification loading
    const [repoValid, setRepoValid] = useState(false);
    const [error, setError] = useState('');

    // Debounced Repository Verification
    useEffect(() => {
        const verifyRepo = async () => {
            if (!repoUrl) {
                setRepoValid(false);
                setError('');
                return;
            }

            // Basic format check before API call
            if (!repoUrl.includes('github.com')) {
                setRepoValid(false);
                return;
            }

            setVerifying(true);
            setError('');

            try {
                const res = await fetch('/api/verify-repo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ repoUrl })
                });

                const data = await res.json();

                if (res.ok) {
                    setRepoValid(true);
                    setRepoId(data.details.id); // Capture Repo ID
                    setError('');
                } else {
                    setRepoValid(false);
                    setRepoId(null);
                    setError(data.error || 'Repository verification failed');
                }
            } catch (err) {
                setRepoValid(false);
                setRepoId(null);
                setError('Failed to connect to verification service');
            } finally {
                setVerifying(false);
            }
        };

        const timeoutId = setTimeout(() => {
            if (repoUrl) verifyRepo();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [repoUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!repoUrl || !platform || !authToken || !repoValid) return;

        setLoading(true);
        // Call parent handler directly since repo is already verified
        // Pass repoId here
        onDeploy(repoUrl, platform, authToken, repoId);
        setLoading(false);
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">GitHub Repository URL</label>
                    <div className="input-wrapper">
                        <Github className="input-icon" />
                        <input
                            type="url"
                            placeholder="https://github.com/username/project"
                            className={`text-input ${error ? 'border-red-500 focus:border-red-500 focus:shadow-red-500/20' : ''} ${repoValid ? 'border-green-500 focus:border-green-500 focus:shadow-green-500/20' : ''}`}
                            value={repoUrl}
                            onChange={(e) => {
                                setRepoUrl(e.target.value);
                                // Reset state immediately on change
                                setRepoValid(false);
                            }}
                            required
                        />
                        {/* Status Icons */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-transparent pointer-events-none">
                            {verifying && <Loader2 className="animate-spin text-gray-400" size={18} />}
                            {!verifying && repoValid && <Check className="text-green-500" size={18} />}
                            {!verifying && error && <X className="text-red-500" size={18} />}
                        </div>
                    </div>
                    {error && (
                        <div className="flex items-center gap-2 mt-2 text-red-400 text-sm animate-fade-in">
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </div>
                    )}
                    {repoValid && !verifying && (
                        <div className="flex items-center gap-2 mt-2 text-green-400 text-sm animate-fade-in">
                            <Check size={14} />
                            <span>Repository Verified</span>
                        </div>
                    )}
                </div>

                <div className="input-group">
                    <label className="label">Select Deployment Platform</label>
                    <div className="platform-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                        <button
                            type="button"
                            className={`platform-btn ${platform === 'Vercel' ? 'active' : ''}`}
                            onClick={() => setPlatform('Vercel')}
                        >
                            <svg width="20" height="20" viewBox="0 0 1155 1000" fill="currentColor"><path d="M577.344 0L1154.69 1000H0L577.344 0Z" /></svg>
                            <span>Vercel</span>
                        </button>
                        <button
                            type="button"
                            className={`platform-btn ${platform === 'Netlify' ? 'active' : ''}`}
                            onClick={() => setPlatform('Netlify')}
                        >
                            <Globe width="20" height="20" />
                            <span>Netlify</span>
                        </button>
                        <button
                            type="button"
                            className={`platform-btn ${platform === 'DigitalOcean' ? 'active' : ''}`}
                            onClick={() => setPlatform('DigitalOcean')}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 0C5.408 0 .002 5.474.002 12.187c0 5.912 4.158 10.85 9.728 11.959v-4.065c-3.544-.997-5.592-4.23-5.592-7.894 0-4.582 3.706-8.315 8.287-8.315 4.582 0 8.315 3.733 8.315 8.315 0 3.677-2.062 6.897-5.592 7.894v4.065c5.572-1.11 9.729-6.047 9.729-11.959C24.877 5.474 18.67 0 12.04 0zm-2.41 22.065v-3.676H5.954v-3.649h3.676v-3.648H5.954V7.436H2.278v14.629h7.352z"/></svg>
                            <span>DigitalOcean</span>
                        </button>
                    </div>
                </div>

                {platform && (
                    <div className="input-group animate-fade-in">
                        <label className="label">{platform} Access Token</label>
                        <div className="input-wrapper">
                            <Key className="input-icon" />
                            <input
                                type="password"
                                placeholder={`Enter your ${platform} Access Token`}
                                className="text-input"
                                value={authToken}
                                onChange={(e) => setAuthToken(e.target.value)}
                                required
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            {platform === 'Vercel' && (
                                <>Get your token from <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Vercel Settings</a></>
                            )}
                            {platform === 'Netlify' && (
                                <>Get your token from <a href="https://app.netlify.com/user/applications#personal-access-tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Netlify User Settings</a></>
                            )}
                            {platform === 'DigitalOcean' && (
                                <>Get your token from <a href="https://cloud.digitalocean.com/account/api/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">DigitalOcean API Tokens</a>. Requires <strong>write</strong> scope.</>
                            )}
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={!repoUrl || !platform || !authToken || !repoValid || loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner" style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}></span>
                            Deploying...
                        </>
                    ) : (
                        <>
                            <Play width="20" height="20" fill="currentColor" />
                            Deploy Now
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
