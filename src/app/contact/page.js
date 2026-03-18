import { Mail, MessageCircle } from 'lucide-react';

export const metadata = { title: 'Contact | One-Click Deployment' };

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto mt-4 mb-20 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full point-events-none"></div>

      <div className="relative z-10 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Get in Touch</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Whether you have a technical question, want to request a feature, or just want to chat about deployment strategies, we're here for you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center group hover:bg-gray-900/60 hover:border-green-500/30 transition-all duration-500">
          <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
            <Mail size={36} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Direct Email</h2>
          <p className="text-gray-400 mb-6">Send us an email directly, and we usually respond within 24 hours.</p>
          <a href="mailto:demo@oneclickdeploy.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-green-400 font-mono transition-colors">
            demo@oneclickdeploy.com
          </a>
        </div>

        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center group hover:bg-gray-900/60 hover:border-blue-500/30 transition-all duration-500">
          <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
            <MessageCircle size={36} className="text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Community Support</h2>
          <p className="text-gray-400 mb-6">Join our deployment community to share tips and get quick help from peers.</p>
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-300 font-semibold cursor-not-allowed opacity-70">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}
