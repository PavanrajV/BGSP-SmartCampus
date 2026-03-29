import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, BookOpen, ClipboardList, FileText, Bell, TrendingUp } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    { label: 'Overall Attendance', value: '85%', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Average Marks', value: '78/100', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Assignments Due', value: '3', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'New Notices', value: '5', icon: Bell, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Welcome, {user.name}!</h1>
          <p className="text-muted">Here's what's happening with your academics today.</p>
        </div>
        <div className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-border shadow-sm">
          <div className="text-right">
            <p className="text-sm font-semibold">{user.register_number}</p>
            <p className="text-xs text-muted">Sem {user.semester} • Sec {user.section}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
            {user.name[0]}
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-ink">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Summary */}
        <div className="lg:col-span-2 card">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              Subject-wise Attendance
            </h2>
            <button className="text-sm text-primary font-semibold hover:underline">View Detailed Report</button>
          </div>
          <div className="p-6 space-y-6">
            {[
              { subject: 'Computer Networks', attended: 32, total: 35 },
              { subject: 'Database Management', attended: 28, total: 35 },
              { subject: 'Software Engineering', attended: 34, total: 35 },
              { subject: 'Operating Systems', attended: 30, total: 35 },
            ].map((sub, i) => {
              const percentage = Math.round((sub.attended / sub.total) * 100);
              return (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-ink">{sub.subject}</span>
                    <span className="text-muted">{percentage}% ({sub.attended}/{sub.total})</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${percentage < 75 ? 'bg-red-500' : 'bg-primary'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="card">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Recent Announcements
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { title: 'Internal Assessment 2', date: 'Oct 15, 2023', type: 'Exam' },
              { title: 'Workshop on Cloud Computing', date: 'Oct 20, 2023', type: 'Event' },
              { title: 'Holiday Notice', date: 'Oct 24, 2023', type: 'General' },
            ].map((note, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-primary/20 transition-colors cursor-pointer">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{note.type}</p>
                <p className="font-semibold text-ink mb-1">{note.title}</p>
                <p className="text-xs text-muted">{note.date}</p>
              </div>
            ))}
            <button className="w-full btn btn-outline text-sm">View All Announcements</button>
          </div>
        </div>
      </div>
    </div>
  );
};
