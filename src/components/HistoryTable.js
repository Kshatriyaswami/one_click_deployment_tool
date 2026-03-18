import { Trash2, ExternalLink, Clock } from 'lucide-react';

export default function HistoryTable({ history, onDelete }) {
    if (!history || history.length === 0) return null;

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'success':
                return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'failure':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'cloning':
            case 'building':
            case 'deploying':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse';
            default:
                return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="w-full animate-fade-in mt-8 overflow-hidden rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur-xl shadow-2xl">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 border-b border-white/5 flex items-center gap-3">
                <Clock className="text-blue-400" size={24} />
                <h2 className="text-xl font-bold tracking-tight text-white">Deployment History</h2>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black/20 text-gray-400 text-sm font-semibold tracking-wide border-b border-white/5">
                            <th className="p-4 pl-6 w-[30%]">Repository</th>
                            <th className="p-4 w-[15%]">Platform</th>
                            <th className="p-4 w-[15%]">Status</th>
                            <th className="p-4 w-[15%]">Live URL</th>
                            <th className="p-4 w-[15%]">Time</th>
                            <th className="p-4 pr-6 w-[10%] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {history.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="p-4 pl-6">
                                    <div className="flex flex-col">
                                        <span className="font-mono text-gray-300 text-sm truncate max-w-[250px]" title={item.repoUrl}>
                                            {item.repoUrl.replace('https://github.com/', '')}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700">
                                        {item.platform}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(item.status)}`}>
                                        <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current"></span>
                                        {item.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {item.url ? (
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm group/link"
                                        >
                                            Visit <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                        </a>
                                    ) : (
                                        <span className="text-gray-600 font-mono text-sm">-</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <span className="text-gray-400 text-xs">
                                        {new Date(item.timestamp).toLocaleString(undefined, {
                                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </span>
                                </td>
                                <td className="p-4 pr-6 text-right">
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="inline-flex items-center justify-center p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_10px_rgba(239,68,68,0.4)] focus:outline-none"
                                        title="Delete Deployment"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
