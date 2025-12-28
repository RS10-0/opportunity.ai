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

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResults(data.opportunities || []);
    } catch (error) {
      console.error("AI connection failed");
    } finally {
      setLoading(false);
    }
  }

  if (view === 'landing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <h1 className="text-6xl font-extrabold mb-4">Opportunity<span className="text-indigo-600">.ai</span></h1>
        <p className="text-xl text-gray-500 mb-10">Turn your skills into real income with AI.</p>
        <button onClick={() => setView('input')} className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg">Find My Opportunities</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      {view === 'input' ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold">What are we working with?</h2>
          <div>
            <label className="block font-bold mb-2">Skills / Hobbies</label>
            <textarea name="skills" className="w-full p-4 border rounded-xl" rows={3} placeholder="Writing, design, etc." required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="time" type="number" placeholder="Hours/week" className="p-4 border rounded-xl" required />
            <input name="money" type="number" placeholder="Budget $" className="p-4 border rounded-xl" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold">Generate with AI</button>
        </form>
      ) : (
        <div className="space-y-6">
          <button onClick={() => setView('input')} className="text-indigo-600 font-bold mb-4">← Edit Profile</button>
          {loading ? (
            <div className="text-center py-20"><p className="text-2xl font-bold animate-pulse">AI is thinking...</p></div>
          ) : (
            results.map((item, i) => (
              <div key={i} className="p-8 bg-white border rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.desc}</p>
                </div>
                <a href={item.link || "#"} target="_blank" className="bg-black text-white px-8 py-3 rounded-xl font-bold mt-4 md:mt-0">Get Started</a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
