"use client";
import { useState } from 'react';

export default function UniversalConverter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('smart');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConvert = async () => {
    if (!text) return alert("Paste some text first!");
    setLoading(true);
    setResult('');
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode }),
      });
      const data = await res.json();
      setResult(data.result || "Error: Something went wrong.");
    } catch (err) {
      setResult("Error: Failed to connect to the brain.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen p-6 md:p-20 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-5xl font-black mb-2 italic">UNIVERSAL CONVERTER ⭐</h1>
        <p className="text-gray-500 text-lg mb-8 uppercase tracking-widest font-bold">Paste Anything → Convert Instantly</p>

        {/* Input Area */}
        <textarea 
          className="w-full h-64 p-6 border-4 border-black rounded-2xl tool-shadow text-lg focus:outline-none mb-6 resize-none"
          placeholder="Paste messy notes, emails, or study material here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Mode Selectors */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'smart', label: '✨ Smart Mode' },
            { id: 'summary', label: 'Summary' },
            { id: 'study', label: 'Study Guide' },
            { id: 'professional', label: 'Pro-Rewrite' },
            { id: 'todo', label: 'To-Do List' }
          ].map((m) => (
            <button 
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-5 py-2 rounded-full border-2 border-black font-black uppercase text-xs transition-colors ${mode === m.id ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={handleConvert}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-5 rounded-2xl font-black text-2xl border-4 border-black tool-shadow transition-all disabled:opacity-50"
        >
          {loading ? "PROCESSING..." : "CONVERT NOW →"}
        </button>

        {/* Result Area */}
        {result && (
          <div className="mt-12 p-8 bg-white border-4 border-black rounded-2xl tool-shadow relative">
             <button 
               onClick={copyToClipboard}
               className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 px-4 py-2 border-2 border-black rounded-lg text-xs font-black uppercase transition-all"
             >
               {copied ? "COPIED!" : "COPY"}
             </button>
            <h2 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-4">Final Result</h2>
            <div className="text-lg whitespace-pre-wrap leading-relaxed font-medium">
              {result}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
