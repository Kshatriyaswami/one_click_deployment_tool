import { Trash2, FolderGit2 } from 'lucide-react';

export default function CloneTable({ clones, onDelete }) {
    if (!clones || clones.length === 0) return null;

    return (
        <div className="w-full animate-fade-in mt-8 overflow-hidden rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur-xl shadow-xl">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 border-b border-white/5 flex items-center gap-3">
                 <FolderGit2 className="text-yellow-500" size={24} />
                 <h2 className="text-xl font-bold tracking-tight text-white">Cloned Repositories</h2>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black/20 text-gray-400 text-sm font-semibold tracking-wide border-b border-white/5">
                            <th className="p-4 pl-6 w-[35%]">Repository URL</th>
                            <th className="p-4 w-[40%]">Local Server Path</th>
                            <th className="p-4 w-[15%]">Timestamp</th>
                            <th className="p-4 pr-6 w-[10%] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {clones.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="p-4 pl-6">
                                    <div className="font-mono text-gray-300 text-sm truncate max-w-[300px]" title={item.repoUrl}>
                                        {item.repoUrl}
                                    </div>
                                </td>
                                <td className="p-4">
                                     <div className="font-mono text-gray-500 text-xs truncate max-w-[350px] bg-black/40 px-3 py-1.5 rounded-md border border-white/5" title={item.path}>
                                        {item.path}
                                    </div>
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
                                        title="Delete Local Clone from Server"
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
