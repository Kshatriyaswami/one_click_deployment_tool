"use client";

import { useState } from 'react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto mt-4 mb-20 relative">
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-yellow-500/10 blur-[100px] rounded-full point-events-none"></div>

      <div className="relative z-10 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 mb-4">
            <MessageSquare size={36} className="text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Share Your Feedback</h1>
          <p className="text-gray-400 mt-2">Your insights help us build a better deployment experience.</p>
        </div>
        
        {submitted ? (
          <div className="animate-fade-in bg-green-500/10 border border-green-500/20 p-8 rounded-2xl text-center">
            <div className="flex justify-center mb-4">
               <CheckCircle2 size={48} className="text-green-400" />
            </div>
            <h2 className="text-2xl text-green-300 font-bold mb-2">Feedback Received!</h2>
            <p className="text-green-400/80 mb-6">Thank you for taking the time to help us improve.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors font-medium border border-gray-700"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-semibold ml-1">Name</label>
                <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-semibold ml-1">Email</label>
                <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all" placeholder="jane@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-semibold ml-1">What's on your mind?</label>
              <textarea required rows={5} className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all resize-none" placeholder="I love the tool, but what if it could..."></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 disabled:opacity-50 px-6 py-3.5 rounded-xl font-bold text-white transition-all shadow-[0_4px_15px_rgba(234,179,8,0.3)] hover:shadow-[0_4px_25px_rgba(234,179,8,0.5)] transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <><Send size={18} /> Send Feedback</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
