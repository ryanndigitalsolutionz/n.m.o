import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Monitor, Bell, Shield, User, Globe } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Monitor size={20} className="text-primary-500" />
          Appearance
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">Theme</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Currently using {theme === 'dark' ? 'dark' : 'light'} mode
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Bell size={20} className="text-amber-500" />
          Notifications
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Email notifications', desc: 'Receive updates via email', checked: true },
            { label: 'Shipment alerts', desc: 'Get notified when shipments change status', checked: true },
            { label: 'Certification renewals', desc: 'Reminders before certifications expire', checked: false },
            { label: 'Royalty payments', desc: 'Notifications for payment processing', checked: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600" />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Shield size={20} className="text-emerald-500" />
          Security
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Two-factor authentication', desc: 'Add an extra layer of security', checked: false },
            { label: 'Login alerts', desc: 'Get notified of new device logins', checked: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600" />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
