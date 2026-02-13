import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 bg-background-dark/90 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-success/20 p-2 rounded-lg border border-success/20">
              <span className="material-icons-round text-success text-xl">
                school
              </span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              QrazyQuiz
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span className="material-icons-round text-base">
                account_circle
              </span>
              <span className="hidden sm:inline">
                {user?.username || "Student Profile"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-red-400 transition-colors"
              title="Logout"
            >
              <span className="material-icons-round text-lg">logout</span>
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
