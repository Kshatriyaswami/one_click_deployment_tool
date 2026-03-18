"use client";

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      question: "Which hosting platforms are supported?",
      answer: "Currently, we support deploying directly to Vercel and Netlify."
    },
    {
      question: "Do I need a GitHub account connected?",
      answer: "No! Unlike other deployment tools, we just need a publicly accessible GitHub URL. No OAuth connection or permissions are required."
    },
    {
      question: "Why do I need to provide a Personal Access Token?",
      answer: "Since we do not connect your accounts via OAuth, we need the token to authenticate with the API of your chosen hosting platform (like Vercel or Netlify) to upload your files on your behalf."
    },
    {
      question: "Are my files stored permanently?",
      answer: "No. Your repository is cloned temporarily on our servers to run the build and upload process. The tool is designed to be stateless regarding your code."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto mt-4 mb-20 relative">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full point-events-none -z-10"></div>

      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <HelpCircle size={40} className="text-purple-400" />
        </div>
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-400">Everything you need to know about the product and billing.</p>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className={`bg-gray-900/40 backdrop-blur-sm border transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer ${isOpen ? 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : 'border-white/5 hover:border-white/10 hover:bg-gray-800/40'}`}
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
            >
              <div className="p-6 flex justify-between items-center">
                <h3 className={`text-lg font-semibold transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                  {faq.question}
                </h3>
                <div className={`p-1.5 rounded-full bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-purple-500/20 text-purple-400' : 'text-gray-400'}`}>
                   <ChevronDown size={20} />
                </div>
              </div>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
