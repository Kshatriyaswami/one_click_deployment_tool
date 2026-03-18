import { BookOpen, Github, Key, Rocket, ArrowRight } from 'lucide-react';

export const metadata = { title: 'How to Use | One-Click Deployment' };

export default function HowToUsePage() {
  const steps = [
    {
      icon: <Github className="text-white" size={28} />,
      bg: "bg-gray-800",
      border: "border-gray-600",
      title: "1. Get your Repository URL",
      description: "Ensure your GitHub repository is public. Copy the URL from your browser (e.g., https://github.com/username/project)."
    },
    {
      icon: <Key className="text-blue-400" size={28} />,
      bg: "bg-blue-900/40",
      border: "border-blue-500/30",
      title: "2. Generate Access Token",
      description: "Log into your preferred platform (Vercel or Netlify) and generate a Personal Access Token in your account settings."
    },
    {
      icon: <Rocket className="text-green-400" size={28} />,
      bg: "bg-green-900/40",
      border: "border-green-500/30",
      title: "3. Deploy in One Click",
      description: "Paste the URL and Token into the main deployment form, select your platform, and watch the live logs as we deploy!"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto mt-4 mb-20 relative px-4">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full point-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-500/10 blur-[100px] rounded-full point-events-none -z-10"></div>

      <div className="text-center mb-16">
        <div className="inline-flex p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <BookOpen size={40} className="text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          How It Works
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Deploying your web application has never been this simple. Follow these three steps to get your project live in seconds.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {steps.map((step, idx) => (
          <div key={idx} className="relative group">
            {/* Connecting Line between cards (hidden on mobile) */}
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-700 to-transparent z-0"></div>
            )}
            
            <div className="h-full bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center hover:bg-gray-900/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-10 relative overflow-hidden">
               {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className={`p-4 ${step.bg} rounded-2xl mb-6 border ${step.border} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
