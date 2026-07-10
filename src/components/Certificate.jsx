import { useState } from 'react';
import { Award, CheckCircle, Clock, AlertCircle, Calendar, FileText, Download, Search, Filter } from 'lucide-react';

const certifications = [
  {
    id: 1,
    name: 'ISO 14001:2015',
    category: 'Environmental Management',
    status: 'active',
    issued: '2023-03-15',
    expires: '2026-03-15',
    issuer: 'SGS Kenya',
    description: 'Environmental management system certification for sustainable mining practices.',
  },
  {
    id: 2,
    name: 'ISO 9001:2015',
    category: 'Quality Management',
    status: 'active',
    issued: '2023-01-10',
    expires: '2026-01-10',
    issuer: 'Bureau Veritas',
    description: 'Quality management system certification ensuring consistent product quality.',
  },
  {
    id: 3,
    name: 'OHSAS 18001',
    category: 'Occupational Health & Safety',
    status: 'active',
    issued: '2023-06-20',
    expires: '2026-06-20',
    issuer: 'TÜV Rheinland',
    description: 'Occupational health and safety management system certification.',
  },
  {
    id: 4,
    name: 'Fairmined',
    category: 'Ethical Sourcing',
    status: 'renewal',
    issued: '2022-08-01',
    expires: '2024-08-01',
    issuer: 'Alliance for Responsible Mining',
    description: 'Certification for responsible artisanal and small-scale mining.',
  },
  {
    id: 5,
    name: 'Conflict-Free',
    category: 'Supply Chain',
    status: 'active',
    issued: '2024-01-05',
    expires: '2025-01-05',
    issuer: 'RMI',
    description: 'Conflict minerals compliance certification.',
  },
  {
    id: 6,
    name: 'Carbon Neutral',
    category: 'Sustainability',
    status: 'pending',
    issued: '2024-02-15',
    expires: '2025-02-15',
    issuer: 'South Pole',
    description: 'Carbon neutrality certification for mining operations.',
  },
];

const statusConfig = {
  active: { icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30', label: 'Active' },
  renewal: { icon: Clock, color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30', label: 'Renewal Due' },
  pending: { icon: AlertCircle, color: 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30', label: 'Pending' },
  expired: { icon: AlertCircle, color: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30', label: 'Expired' },
};

export default function Certifications() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = certifications.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search certifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="renewal">Renewal Due</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((cert) => {
          const status = statusConfig[cert.status];
          const StatusIcon = status.icon;
          return (
            <div
              key={cert.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${status.color}`}>
                  <Award size={20} />
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                  <StatusIcon size={12} />
                  {status.label}
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1">
                {cert.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                {cert.category}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                {cert.description}
              </p>
              <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>Issued: {cert.issued}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>Expires: {cert.expires}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={14} />
                  <span>Issuer: {cert.issuer}</span>
                </div>
              </div>
              <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Download size={16} />
                Download Certificate
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
