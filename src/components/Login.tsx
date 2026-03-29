import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { BookOpen, Lock, User, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(role, regNo);
      toast.success(`Welcome back, ${regNo}!`);
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl text-primary mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-ink">BGSP SmartCampus</h1>
          <p className="text-muted">Intelligent College Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {Object.values(UserRole).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  role === r ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-ink'
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder={role === UserRole.STUDENT ? "Register Number" : "Staff ID / Email"}
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className="input pl-11"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-11"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary flex items-center justify-center gap-2"
          >
            {loading ? 'Logging in...' : (
              <>
                <ShieldCheck className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        {role === UserRole.STUDENT && (
          <p className="mt-8 text-center text-sm text-muted">
            Don't have an account?{' '}
            <button className="text-primary font-semibold hover:underline">
              Register here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
