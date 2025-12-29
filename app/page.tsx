"use client";
import { useState } from 'react';

export default function UniversalConverter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('smart');
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ text, mode }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-10 font-sans">
      <h1 className="text-4xl font-bold mb-2">Universal Converter ⭐</h1>
      <p className="text-gray-500 mb-8">Paste anything. Choose what it becomes.</p>

      <textarea 
        className="w-full h-64 p-4 border-2 border-black rounded-xl mb-4 text-lg"
        placeholder="Paste your messy notes, articles, or homework here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {['smart', 'summary', 'fiveyearold', 'flashcards', 'professional', 'todo'].map((m) => (
          <button 
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-full border-2 border-black font-bold uppercase text-xs ${mode === m ? 'bg-black text-white' : 'bg-white'}`}
          >
            {m.replace('fiveyearold', 'Explain Like I\'m 5')}
          </button>
        ))}
      </div>

      <button 
        onClick={handleConvert}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-blue-700 transition"
      >
        {loading ? "CONVERTING..." : "CONVERT →"}
      </button>

      {result && (
        <div className="mt-10 p-6 bg-gray-100 rounded-xl border-2 border-dashed border-gray-400 whitespace-pre-wrap">
          <h2 className="font-bold mb-4 uppercase text-gray-400">Result:</h2>
          {result}
        </div>
      )}
    </div>
  );
}
