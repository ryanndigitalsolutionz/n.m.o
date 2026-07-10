import { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown, DollarSign, Calendar, FileText, Download, Search } from 'lucide-react';

const royalties = [
  {
    id: 1,
    period: 'June 2024',
    mineral: 'Titanium',
    quantity: '2,800 tonnes',
    rate: '$45/tonne',
    gross: '$126,000',
    deductions: '$12,600',
    net: '$113,400',
    status: 'paid',
    datePaid: '2024-06-30',
  },
  {
    id: 2,
    period: 'June 2024',
    mineral: 'Zircon',
    quantity: '1,500 tonnes',
    rate: '$62/tonne',
    gross: '$93,000',
    deductions: '$9,300',
    net: '$83,700',
    status: 'paid',
    datePaid: '2024-06-30',
  },
  {
    id: 3,
    period: 'June 2024',
    mineral: 'Rutile',
    quantity: '980 tonnes',
    rate: '$78/tonne',
    gross: '$76,440',
    deductions: '$7,644',
    net: '$68,796',
    status: 'paid',
    datePaid: '2024-06-30',
  },
  {
    id: 4,
    period: 'May 2024',
    mineral: 'Titanium',
    quantity: '2,600 tonnes',
    rate: '$45/tonne',
    gross: '$117,000',
    deductions: '$11,700',
    net: '$105,300',
    status: 'paid',
    datePaid: '2024-05-31',
  },
  {
    id: 5,
    period: 'May 2024',
    mineral: 'Ilmenite',
    quantity: '2,100 tonnes',
    rate: '$38/tonne',
    gross: '$79,800',
    deductions: '$7,980',
    net: '$71,820',
    status: 'paid',
    datePaid: '2024-05-31',
  },
  {
    id: 6,
    period: 'July 2024',
    mineral: 'Titanium',
    quantity: '3,000 tonnes',
    rate: '$45/tonne',
    gross: '$135,000',
    deductions: '$13,500',
    net: '$121,500',
    status: 'pending',
    datePaid: '-',
  },
];

const summary = {
  totalPaid: '$442,020',
  totalPending: '$121,500',
  totalGross: '$627,240',
  ytdTotal: '$1,245,680',
};

const statusConfig = {
  paid: { color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30', label: 'Paid' },
  pending: { color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30', label: 'Pending' },
  overdue: { color: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30', label: 'Overdue' },
};

export default function Royalties() {
  const [search, setSearch] = useState('');

  const filtered = royalties.filter((r) =>
    r.mineral.toLowerCase().includes(search.toLowerCase()) || r.period.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <DollarSign size={18} />
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">Total Paid</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{summary.totalPaid}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <Calculator size={18} />
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">Pending</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{summary.totalPending}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <TrendingUp size={18} />
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">Gross Revenue</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{summary.totalGross}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
              <Calendar size={18} />
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">YTD Total</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{summary.ytdTotal}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search royalties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Period</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mineral</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rate</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gross</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Deductions</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Net</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((r) => {
                const status = statusConfig[r.status];
                return (
                  <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{r.period}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-white">{r.mineral}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{r.quantity}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{r.rate}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{r.gross}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{r.deductions}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-white">{r.net}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
