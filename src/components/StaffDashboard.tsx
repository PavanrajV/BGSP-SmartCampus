import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, ClipboardCheck, FileUp, BookOpen, Plus, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'attendance' | 'marks' | 'notes'>('attendance');

  if (!user) return null;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-ink">Staff Portal</h1>
        <p className="text-muted">Manage your classes, attendance, and student performance.</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        {[
          { id: 'attendance', label: 'Mark Attendance', icon: ClipboardCheck },
          { id: 'marks', label: 'Upload Marks', icon: FileUp },
          { id: 'notes', label: 'Study Materials', icon: BookOpen },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all border-b-2 ${
              activeTab === tab.id 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="card p-8">
        {activeTab === 'attendance' && <AttendanceModule />}
        {activeTab === 'marks' && <MarksModule />}
        {activeTab === 'notes' && <NotesModule />}
      </div>
    </div>
  );
};

const AttendanceModule = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSave = () => {
    toast.success('Attendance saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select className="input" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
          <option value="">Select Class (Sem/Sec)</option>
          <option value="3A">3rd Sem - A Section</option>
          <option value="3B">3rd Sem - B Section</option>
        </select>
        <select className="input" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
          <option value="">Select Subject</option>
          <option value="CN">Computer Networks</option>
          <option value="DBMS">Database Management</option>
        </select>
        <input type="date" className="input" defaultValue={new Date().toISOString().split('T')[0]} />
      </div>

      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-bold text-sm">Roll No</th>
              <th className="px-6 py-4 font-bold text-sm">Register No</th>
              <th className="px-6 py-4 font-bold text-sm">Student Name</th>
              <th className="px-6 py-4 font-bold text-sm text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 text-sm">{i}</td>
                <td className="px-6 py-4 text-sm font-mono">21CS00{i}</td>
                <td className="px-6 py-4 text-sm font-medium">Student {i}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`status-${i}`} className="w-4 h-4 text-primary" defaultChecked />
                      <span className="text-sm font-medium text-green-600">Present</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`status-${i}`} className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-500">Absent</span>
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn btn-primary px-8">Save Attendance</button>
      </div>
    </div>
  );
};

const MarksModule = () => {
  const handleUpload = () => {
    toast.success('Marks updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select className="input"><option>Select Class</option></select>
        <select className="input"><option>Select Subject</option></select>
        <select className="input">
          <option>Internal 1</option>
          <option>Internal 2</option>
          <option>Internal 3</option>
          <option>Assignment</option>
        </select>
        <button className="btn btn-outline flex items-center justify-center gap-2">
          <Search className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-bold text-sm">Reg No</th>
              <th className="px-6 py-4 font-bold text-sm">Name</th>
              <th className="px-6 py-4 font-bold text-sm text-center">Marks (Max 50)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-sm font-mono">21CS00{i}</td>
                <td className="px-6 py-4 text-sm font-medium">Student {i}</td>
                <td className="px-6 py-4 text-center">
                  <input type="number" className="input w-24 text-center mx-auto" placeholder="0" max="50" min="0" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button onClick={handleUpload} className="btn btn-primary px-8">Update Marks</button>
      </div>
    </div>
  );
};

const NotesModule = () => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/staff/upload-note', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      toast.success(`Uploaded: ${data.originalName}`);
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Study Materials</h3>
        <label className="btn btn-primary flex items-center gap-2 cursor-pointer">
          <Plus className="w-5 h-5" />
          {uploading ? 'Uploading...' : 'Upload New Material'}
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.ppt,.pptx" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Unit 1: Introduction to Networks', subject: 'Computer Networks', type: 'PDF', size: '2.4 MB' },
          { title: 'Unit 2: Data Link Layer', subject: 'Computer Networks', type: 'PPT', size: '5.1 MB' },
          { title: 'Normalization Guide', subject: 'DBMS', type: 'PDF', size: '1.8 MB' },
        ].map((note, i) => (
          <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-ink mb-1">{note.title}</h4>
            <p className="text-sm text-muted mb-4">{note.subject}</p>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded uppercase">{note.type}</span>
              <span className="text-muted">{note.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
