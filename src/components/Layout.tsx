import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, LayoutDashboard, BookOpen, ClipboardList, Bell, FileText, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  if (!user) return <>{children}</>;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', roles: ['student', 'staff', 'admin'] },
    { icon: ClipboardList, label: 'Attendance', roles: ['student', 'staff'] },
    { icon: FileText, label: 'Marks', roles: ['student', 'staff'] },
    { icon: BookOpen, label: 'Study Materials', roles: ['student', 'staff'] },
    { icon: Bell, label: 'Announcements', roles: ['student', 'staff', 'admin'] },
    { icon: User, label: 'Admin Panel', roles: ['admin'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            SmartCampus
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {filteredMenu.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-4 py-2 text-secondary hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {user.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted truncate capitalize">{user.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};
