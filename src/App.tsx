import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserRole } from './types';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { StudentDashboard } from './components/StudentDashboard';
import { StaffDashboard } from './components/StaffDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Toaster } from 'react-hot-toast';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    if (isRegistering) {
      return <Register onBack={() => setIsRegistering(false)} />;
    }
    return (
      <div className="relative">
        <Login />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full max-w-md px-8">
          <p className="text-sm text-muted">
            Don't have an account?{' '}
            <button 
              onClick={() => setIsRegistering(true)}
              className="text-primary font-semibold hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {user.role === UserRole.STUDENT && <StudentDashboard />}
      {user.role === UserRole.STAFF && <StaffDashboard />}
      {user.role === UserRole.ADMIN && <AdminDashboard />}
    </Layout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}
