"use client";
import { useState } from 'react';

export default function OpportunityAI() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [view, setView] = useState('landing');

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setView('results');

    const formData = {
      skills: e.target.skills.value,
      time: e.target.time.value,
      money: e.target.money.value,
    };

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    
    const data = await res.json();
    setResults(data.opportunities || []);
    setLoading(false);
  }

  if (view === 'landing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-6xl font-extrabold mb-6">Opportunity<span className="text-indigo-600">.ai</span></h1>
        <p className="text-xl text-gray-600 mb-8">Turn your spare time into real income.</p>
        <button onClick={() => setView('input')} className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold">Find My Opportunities</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {view === 'input' ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold">What are your skills?</h2>
          <textarea name="skills" className="w-full p-4 border rounded-xl" placeholder="Coding, writing, gardening..." required />
          <div className="grid grid-cols-2 gap-4">
            <input name="time" type="number" placeholder="Hours/week" className="p-4 border rounded-xl" required />
            <input name="money" type="number" placeholder="Budget $" className="p-4 border rounded-xl" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold">Generate with AI</button>
        </form>
      ) : (
        <div className="space-y-6">
          <button onClick={() => setView('input')} className="text-indigo-600">← Back</button>
          {loading ? <p>AI is thinking...</p> : results.map((item, i) => (
            <div key={i} className="p-6 bg-white border rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
              <a href={item.link} target="_blank" className="inline-block mt-4 bg-black text-white px-6 py-2 rounded-lg">Start Now</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
