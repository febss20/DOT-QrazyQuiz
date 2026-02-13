import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { QuizProvider } from "@/contexts/QuizContext";
import PrivateRoute from "@/components/common/PrivateRoute";
import LoginPage from "@/pages/LoginPage";
import SetupPage from "@/pages/SetupPage";
import QuizPage from "@/pages/QuizPage";
import ResultPage from "@/pages/ResultPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/setup"
              element={
                <PrivateRoute>
                  <SetupPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <PrivateRoute>
                  <QuizPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/result"
              element={
                <PrivateRoute>
                  <ResultPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
