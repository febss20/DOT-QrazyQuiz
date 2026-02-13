import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/setup", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }
    login(username.trim());
    navigate("/setup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-3xl opacity-40 mix-blend-screen" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Login Card */}
      <main className="relative z-10 w-full max-w-md bg-surface-dark shadow-2xl rounded-xl border border-slate-700/50 overflow-hidden animate-scaleIn">
        <div className="p-8 sm:p-10">
          {/* Icon + Heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
              <span className="material-icons text-3xl">school</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Welcome Back
            </h1>
            <p className="text-slate-400 mt-2 text-center text-sm">
              Log in to access your quizzes and results.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label
                className="block text-sm font-medium text-slate-300"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="material-icons text-[20px]">
                    person_outline
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2.5 border border-border-color rounded-lg bg-input-bg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 sm:text-sm"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  autoFocus
                />
              </div>
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>

            <button
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-dark focus:ring-primary transition-all duration-200 transform active:scale-[0.98]"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 w-full text-center pointer-events-none z-10">
        <p className="text-xs text-slate-600">
          © 2026 QrazyQuiz App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
