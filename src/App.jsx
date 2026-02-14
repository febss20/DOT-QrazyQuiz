import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { QuizProvider } from "@/contexts/QuizContext";
import PrivateRoute from "@/components/common/PrivateRoute";
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SetupPage = lazy(() => import("@/pages/SetupPage"));
const QuizPage = lazy(() => import("@/pages/QuizPage"));
const ResultPage = lazy(() => import("@/pages/ResultPage"));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <main className="min-h-full">
            <Suspense>
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
            </Suspense>
          </main>
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
