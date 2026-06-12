// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AITutor from './pages/AITutor.jsx';
import PDFAnalyzer from './pages/PDFAnalyzer.jsx';
import QuizEngine from './pages/QuizEngine.jsx';
import CareerRoadmap from './pages/CareerRoadmap.jsx';
import MockInterview from './pages/MockInterview.jsx';
import Settings from './pages/Settings.jsx';
import LearningHub from './pages/LearningHub.jsx';
import ProtectedLayout from './components/ProtectedLayout.jsx';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequireAuth><ProtectedLayout /></RequireAuth>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/pdf-analyzer" element={<PDFAnalyzer />} />
          <Route path="/quiz-engine" element={<QuizEngine />} />
          <Route path="/career-roadmap" element={<CareerRoadmap />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/learning-hub" element={<LearningHub />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;