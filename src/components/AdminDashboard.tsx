import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, UserPlus, FileSpreadsheet, Settings, Shield, Trash2, Edit2, Upload, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'students' | 'staff' | 'subjects'>('students');

  if (!user) return null;

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Admin Control Panel</h1>
          <p className="text-muted">System-wide management and configuration.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
          <Shield className="w-5 h-5" />
          <span className="font-bold text-sm">Super Admin Access</span>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        {[
          { id: 'students', label: 'Manage Students', icon: Users },
          { id: 'staff', label: 'Manage Staff', icon: UserPlus },
          { id: 'subjects', label: 'Subjects & Assignments', icon: Settings },
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

      <div className="card p-8">
        {activeTab === 'students' && <StudentManagement />}
        {activeTab === 'staff' && <StaffManagement />}
        {activeTab === 'subjects' && <SubjectManagement />}
      </div>
    </div>
  );
};

const StudentManagement = () => {
  const [uploading, setUploading] = useState(false);

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload-students', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      toast.success(`Successfully uploaded ${data.count} students!`);
    } catch (error) {
      toast.error('Excel upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <input type="text" placeholder="Search by Reg No or Name..." className="input pl-10" />
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          </div>
          <select className="input w-40">
            <option>All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s}>Sem {s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <label className="btn btn-outline flex items-center gap-2 cursor-pointer">
            <FileSpreadsheet className="w-5 h-5" />
            {uploading ? 'Processing...' : 'Bulk Upload (Excel)'}
            <input type="file" className="hidden" onChange={handleExcelUpload} accept=".xlsx,.xls" />
          </label>
          <button className="btn btn-primary flex items-center gap-2">
            <UserPlus className="w-5 h-5" /> Add Student
          </button>
        </div>
      </div>

      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-bold text-sm">Reg No</th>
              <th className="px-6 py-4 font-bold text-sm">Name</th>
              <th className="px-6 py-4 font-bold text-sm">Sem/Sec</th>
              <th className="px-6 py-4 font-bold text-sm">Department</th>
              <th className="px-6 py-4 font-bold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { reg: '21CS001', name: 'Ram Kumar', sem: 3, sec: 'A', dept: 'ISE' },
              { reg: '21CS002', name: 'Priya S', sem: 3, sec: 'A', dept: 'ISE' },
              { reg: '21CS003', name: 'Arjun V', sem: 3, sec: 'B', dept: 'ISE' },
            ].map((s, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 text-sm font-mono">{s.reg}</td>
                <td className="px-6 py-4 text-sm font-medium">{s.name}</td>
                <td className="px-6 py-4 text-sm">{s.sem}{s.sec}</td>
                <td className="px-6 py-4 text-sm">{s.dept}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StaffManagement = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold">Faculty Members</h3>
      <button className="btn btn-primary flex items-center gap-2">
        <UserPlus className="w-5 h-5" /> Add Faculty
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'Dr. Smitha', id: 'ST001', dept: 'ISE', subjects: 2 },
        { name: 'Prof. Rajesh', id: 'ST002', dept: 'ISE', subjects: 3 },
        { name: 'Dr. Anand', id: 'ST003', dept: 'CSE', subjects: 1 },
      ].map((staff, i) => (
        <div key={i} className="p-6 border border-border rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {staff.name[0]}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-ink">{staff.name}</h4>
            <p className="text-xs text-muted">{staff.id} • {staff.dept}</p>
            <p className="text-xs font-semibold text-primary mt-1">{staff.subjects} Subjects Assigned</p>
          </div>
          <button className="p-2 text-secondary hover:text-primary rounded-lg">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const SubjectManagement = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold">Subjects & Assignments</h3>
      <button className="btn btn-primary flex items-center gap-2">
        <Plus className="w-5 h-5" /> Add Subject
      </button>
    </div>
    <div className="border border-border rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-border">
          <tr>
            <th className="px-6 py-4 font-bold text-sm">Subject Code</th>
            <th className="px-6 py-4 font-bold text-sm">Subject Name</th>
            <th className="px-6 py-4 font-bold text-sm">Assigned Staff</th>
            <th className="px-6 py-4 font-bold text-sm">Sem/Dept</th>
            <th className="px-6 py-4 font-bold text-sm text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {[
            { code: '21IS31', name: 'Computer Networks', staff: 'Dr. Smitha', sem: 3, dept: 'ISE' },
            { code: '21IS32', name: 'DBMS', staff: 'Prof. Rajesh', sem: 3, dept: 'ISE' },
          ].map((sub, i) => (
            <tr key={i}>
              <td className="px-6 py-4 text-sm font-mono">{sub.code}</td>
              <td className="px-6 py-4 text-sm font-medium">{sub.name}</td>
              <td className="px-6 py-4 text-sm">{sub.staff}</td>
              <td className="px-6 py-4 text-sm">Sem {sub.sem} / {sub.dept}</td>
              <td className="px-6 py-4 text-right">
                <button className="text-primary text-sm font-bold hover:underline">Reassign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
