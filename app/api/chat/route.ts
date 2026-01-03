<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlowMind - AI Productivity</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
        .fade-in { animation: fadeIn 0.5s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect } = React;

        // --- MOCK DATA & LOGIC ---
        const initialTasks = [
            { id: 1, title: "Finalize Pitch Deck", priority: "High", aiScore: 95, status: "Pending" },
            { id: 2, title: "Email Marketing Draft", priority: "Medium", aiScore: 70, status: "Pending" },
            { id: 3, title: "Update LinkedIn Profile", priority: "Low", aiScore: 30, status: "Completed" },
        ];

        // --- COMPONENTS ---

        // 1. Landing Page Component
        const LandingPage = ({ onLogin }) => (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6 fade-in">
                <div className="mb-8">
                    <i className="fa-solid fa-brain text-6xl text-indigo-600 mb-4"></i>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">FlowMind</h1>
                    <p className="text-xl text-gray-600 max-w-lg mx-auto">
                        AI-powered task management that prioritizes your work so you don't have to.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
                    <div className="p-6 border rounded-xl shadow-sm">
                        <i className="fa-solid fa-bolt text-indigo-500 text-3xl mb-3"></i>
                        <h3 className="font-bold text-lg">AI Prioritization</h3>
                        <p className="text-sm text-gray-500">Smart sorting based on deadlines.</p>
                    </div>
                    <div className="p-6 border rounded-xl shadow-sm">
                        <i className="fa-solid fa-chart-line text-indigo-500 text-3xl mb-3"></i>
                        <h3 className="font-bold text-lg">Analytics</h3>
                        <p className="text-sm text-gray-500">Track your peak flow states.</p>
                    </div>
                    <div className="p-6 border rounded-xl shadow-sm">
                        <i className="fa-solid fa-credit-card text-indigo-500 text-3xl mb-3"></i>
                        <h3 className="font-bold text-lg">Flexible Plans</h3>
                        <p className="text-sm text-gray-500">Start free, upgrade anytime.</p>
                    </div>
                </div>

                <button 
                    onClick={onLogin}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition transform hover:scale-105"
                >
                    Get Started (Free)
                </button>
            </div>
        );

        // 2. Dashboard Component
        const Dashboard = ({ isPremium, onUpgrade }) => {
            const [tasks, setTasks] = useState(initialTasks);
            const [loadingAI, setLoadingAI] = useState(false);

            // Simulate AI Prioritization
            const handleAIOptimize = () => {
                if (!isPremium) {
                    alert("🔒 Upgrade to Premium to use AI Prioritization!");
                    onUpgrade();
                    return;
                }
                
                setLoadingAI(true);
                // Mock API delay
                setTimeout(() => {
                    const sorted = [...tasks].sort((a, b) => b.aiScore - a.aiScore);
                    setTasks(sorted);
                    setLoadingAI(false);
                    alert("✨ AI has re-ordered your tasks by importance!");
                }, 1500);
            };

            return (
                <div className="min-h-screen flex flex-col fade-in">
                    {/* Header */}
                    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-brain text-indigo-600 text-2xl"></i>
                            <span className="font-bold text-xl tracking-tight">FlowMind</span>
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                {isPremium ? "PREMIUM" : "FREE PLAN"}
                            </span>
                        </div>
                        <div className="flex gap-4">
                            {!isPremium && (
                                <button onClick={onUpgrade} className="text-indigo-600 font-semibold text-sm hover:underline">
                                    Upgrade to Pro
                                </button>
                            )}
                            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-user text-gray-600"></i>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
                        
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
                                <h4 className="text-gray-500 text-sm font-medium">Tasks Pending</h4>
                                <p className="text-3xl font-bold text-gray-800">12</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                                <h4 className="text-gray-500 text-sm font-medium">Productivity Score</h4>
                                <p className="text-3xl font-bold text-gray-800">84%</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 relative overflow-hidden">
                                <h4 className="text-gray-500 text-sm font-medium">AI Suggestions</h4>
                                {isPremium ? (
                                    <p className="text-3xl font-bold text-gray-800">3 New</p>
                                ) : (
                                    <div className="mt-2">
                                        <button onClick={onUpgrade} className="bg-gray-900 text-white text-xs px-3 py-1 rounded">Unlock</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Task List Section */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-800">My Tasks</h2>
                                <button 
                                    onClick={handleAIOptimize}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        loadingAI ? "bg-gray-100" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                    }`}
                                >
                                    {loadingAI ? (
                                        <>Processing...</>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                                            {isPremium ? "AI Prioritize" : "AI Prioritize (Locked)"}
                                        </>
                                    )}
                                </button>
                            </div>
                            
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-gray-500 text-xs uppercase bg-gray-50 border-b">
                                        <th className="p-4">Task Name</th>
                                        <th className="p-4">Priority</th>
                                        <th className="p-4">AI Score</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {tasks.map(task => (
                                        <tr key={task.id} className="border-b hover:bg-gray-50 transition">
                                            <td className="p-4 font-medium text-gray-800">{task.title}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    task.priority === "High" ? "bg-red-100 text-red-700" : 
                                                    task.priority === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"
                                                }`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500">
                                                {isPremium ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                            <div className="bg-indigo-500 h-1.5 rounded-full" style={{width: `${task.aiScore}%`}}></div>
                                                        </div>
                                                        <span>{task.aiScore}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 italic">Hidden</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-gray-500">{task.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            );
        };

        // 3. Pricing Modal (Simulates Stripe)
        const PricingModal = ({ onClose, onSubscribe }) => (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 fade-in">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>

                    <div className="text-center mb-6">
                        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-crown text-indigo-600 text-2xl"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h2>
                        <p className="text-gray-500 mt-2">Unlock the full power of FlowMind AI.</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3 text-gray-700">
                            <i className="fa-solid fa-check text-green-500"></i> AI Task Prioritization
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                            <i className="fa-solid fa-check text-green-500"></i> Unlimited Projects
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                            <i className="fa-solid fa-check text-green-500"></i> Advanced Analytics
                        </li>
                    </ul>

                    <button 
                        onClick={onSubscribe}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition transform active:scale-95 flex justify-center items-center gap-2"
                    >
                        <span>Subscribe via Stripe</span>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                    
                    <p className="text-xs text-center text-gray-400 mt-4">
                        This is a simulation. No actual charge will occur.
                    </p>
                </div>
            </div>
        );

        // --- MAIN APP CONTAINER ---
        const App = () => {
            const [view, setView] = useState("landing"); // landing, dashboard
            const [isPremium, setIsPremium] = useState(false);
            const [showPricing, setShowPricing] = useState(false);

            const handleLogin = () => setView("dashboard");
            
            const handleUpgradeClick = () => setShowPricing(true);
            
            const handleSubscribe = () => {
                // Simulate Stripe processing delay
                const btn = document.activeElement;
                btn.innerText = "Processing...";
                
                setTimeout(() => {
                    setIsPremium(true);
                    setShowPricing(false);
                    alert("🎉 Payment Successful! Welcome to Premium.");
                }, 2000);
            };

            return (
                <div>
                    {view === "landing" && <LandingPage onLogin={handleLogin} />}
                    
                    {view === "dashboard" && (
                        <Dashboard 
                            isPremium={isPremium} 
                            onUpgrade={handleUpgradeClick} 
                        />
                    )}

                    {showPricing && (
                        <PricingModal 
                            onClose={() => setShowPricing(false)} 
                            onSubscribe={handleSubscribe} 
                        />
                    )}
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
