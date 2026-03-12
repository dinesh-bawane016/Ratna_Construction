import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import ProjectList from './pages/ProjectList';
import DPRForm from './pages/DPRForm';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/projects" element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          } />

          <Route path="/projects/:id/dpr" element={
            <ProtectedRoute>
              <DPRForm />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/projects" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
