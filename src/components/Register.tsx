import React, { useState } from 'react';
import { BookOpen, User, Hash, GraduationCap, Users, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const Register: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    department: '',
    semester: '',
    section: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Registration successful! Your default password is: BGSP@123');
      onBack();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-xl p-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl text-primary mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-ink">Student Registration</h1>
          <p className="text-muted">Join the BGSP SmartCampus community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input pl-11"
                required
              />
            </div>

            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Register Number"
                value={formData.regNo}
                onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                className="input pl-11"
                required
              />
            </div>

            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="input pl-11 appearance-none"
                required
              >
                <option value="">Select Department</option>
                <option value="ISE">ISE</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
              </select>
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="input pl-11 appearance-none"
                required
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>

            <div className="relative md:col-span-2">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Section (e.g., A, B, C)"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="input pl-11 uppercase"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary mt-4"
          >
            {loading ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};
