import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';
import { Settings, User, Bell, Shield, Loader2, AlertCircle, Check } from 'lucide-react';

export default function SettingsManagement() {
  const [data, setData] = useState({ profile: {}, system: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.getAdminSettings();
        setData(res || { profile: {}, system: {} });
        setForm({ name: res?.profile?.name || '', phone: res?.profile?.phone || '' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateAdminProfile(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
      <p className="text-gray-500 font-medium">Loading settings...</p>
    </div>
  );

  if (error) return (
    <div className="bg-rose-50 text-rose-700 p-6 rounded-2xl text-center border border-rose-100">
      <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-80" />
      <h3 className="text-lg font-bold">Error loading settings</h3>
      <p className="mt-1 opacity-80">{error}</p>
    </div>
  );

  const { profile, system } = data;

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 text-gray-600" /> Platform Settings
        </h1>
        <p className="text-gray-500 font-medium mt-1">Manage your profile and system configuration.</p>
      </div>

      {/* Profile Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <User className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-bold text-gray-900">Admin Profile</h2>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input
                type="text" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input
                type="email" value={profile?.email || ''} disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                placeholder="98XXXXXXXX"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
            {saved && <p className="text-emerald-600 font-semibold text-sm">Profile updated successfully.</p>}
          </div>
        </div>
      </motion.div>

      {/* System Configuration */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <Bell className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-bold text-gray-900">System Configuration</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div>
              <p className="font-bold text-gray-800">Municipality Name</p>
              <p className="text-sm text-gray-500">Display name for the platform</p>
            </div>
            <span className="font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">{system?.municipalityName || 'RemitBikas Municipality'}</span>
          </div>
          {[
            { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive email notifications for new contributions and reports' },
            { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive SMS notifications for critical events' },
            { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Require 2FA for admin login' },
          ].map(item => (
            <div key={item.key} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-bold text-gray-800">{item.label}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${system?.[item.key] ? 'bg-emerald-500' : 'bg-gray-300'} flex items-center px-1`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${system?.[item.key] ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <Shield className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-bold text-gray-900">Security</h2>
        </div>
        <div className="p-6">
          <button className="border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all">
            Change Password
          </button>
        </div>
      </motion.div>
    </div>
  );
}
