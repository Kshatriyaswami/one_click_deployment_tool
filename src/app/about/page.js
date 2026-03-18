import { Info, Code, Zap, Globe } from 'lucide-react';

export const metadata = { title: 'About | One-Click Deployment' };

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto mt-4 mb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gray-900/40 backdrop-blur-xl border border-white/10 p-12 text-center mb-8 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/20 blur-[100px] rounded-full point-events-none"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <Info size={48} className="text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400">
            Redefining Web Deployment
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            The One-Click Deployment tool simplifies hosting your web applications by eliminating complex OAuth flows. Experience a true drop-in solution to deploy any public repository directly to top-tier providers.
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900/50 backdrop-blur-md border border-white/5 p-8 rounded-2xl hover:bg-gray-900/80 hover:border-blue-500/30 transition-all duration-300 group transform hover:-translate-y-1 hover:shadow-xl">
          <div className="bg-emerald-500/10 w-12 h-12 flex items-center justify-center rounded-xl border border-emerald-500/20 mb-6 group-hover:scale-110 transition-transform">
            <Code className="text-emerald-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Isolated Builds</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            We use a "Local Clone & Deploy" philosophy. Your code is pulled to our secure temporary servers, processed cleanly, and pushed to the provider.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-md border border-white/5 p-8 rounded-2xl hover:bg-gray-900/80 hover:border-purple-500/30 transition-all duration-300 group transform hover:-translate-y-1 hover:shadow-xl">
          <div className="bg-purple-500/10 w-12 h-12 flex items-center justify-center rounded-xl border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform">
            <Zap className="text-purple-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Zero Config</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            No permissions, no webhooks, no hassle. Provide a URL and token, and let our intelligent processor auto-detect your framework and push it live.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-md border border-white/5 p-8 rounded-2xl hover:bg-gray-900/80 hover:border-cyan-500/30 transition-all duration-300 group transform hover:-translate-y-1 hover:shadow-xl">
          <div className="bg-cyan-500/10 w-12 h-12 flex items-center justify-center rounded-xl border border-cyan-500/20 mb-6 group-hover:scale-110 transition-transform">
            <Globe className="text-cyan-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Global Edge</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            Integrates natively with Next-Generation global CDNs like Vercel and Netlify. Your project is served securely at lightning speed worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}
