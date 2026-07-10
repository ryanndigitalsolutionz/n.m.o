import { useTheme } from '../context/ThemeContext';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Award,
  Ship,
  Mountain,
  Calculator,
  Wheat,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from 'lucide-react';

const harvestData = [
  { name: 'Titanium', value: 4200, color: '#0ea5e9' },
  { name: 'Zircon', value: 2800, color: '#10b981' },
  { name: 'Rutile', value: 1900, color: '#f59e0b' },
  { name: 'Ilmenite', value: 3100, color: '#f43f5e' },
  { name: 'Monazite', value: 1200, color: '#8b5cf6' },
];

const stats = [
  {
    label: 'Total Certifications',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: Award,
    color: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
  },
  {
    label: 'Active Shipments',
    value: '18',
    change: '+5',
    trend: 'up',
    icon: Ship,
    color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  },
  {
    label: 'Mineral Sources',
    value: '12',
    change: '+1',
    trend: 'up',
    icon: Mountain,
    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  },
  {
    label: 'Royalties Paid',
    value: '$1.2M',
    change: '-2%',
    trend: 'down',
    icon: Calculator,
    color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  },
];

const recentActivity = [
  { id: 1, action: 'New shipment dispatched', target: 'Lot #MH-2024-089', time: '2 hours ago', type: 'shipping' },
  { id: 2, action: 'Certification renewed', target: 'ISO 14001:2015', time: '5 hours ago', type: 'cert' },
  { id: 3, action: 'Royalty payment processed', target: '$45,000', time: '1 day ago', type: 'royalty' },
  { id: 4, action: 'New mineral source mapped', target: 'Sector 7B', time: '2 days ago', type: 'source' },
  { id: 5, action: 'Harvest batch completed', target: 'Batch #HB-442', time: '3 days ago', type: 'harvest' },
];

export default function Dashboard() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendIcon
                      size={14}
                      className={
                        stat.trend === 'up'
                          ? 'text-emerald-500'
                          : 'text-rose-500'
                      }
                    />
                    <span
                      className={
                        stat.trend === 'up'
                          ? 'text-emerald-500'
                          : 'text-rose-500'
                      }
                    >
                      {stat.change}
                    </span>
                    <span className="text-slate-400">vs last month</span>
                  </div>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Total Harvest Distribution
            </h3>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Year 2024
            </span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={harvestData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {harvestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    color: theme === 'dark' ? '#fff' : '#1e293b',
                  }}
                  formatter={(value, name) => [
                    `${value.toLocaleString()} tonnes`,
                    name,
                  ]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span
                      style={{
                        color: theme === 'dark' ? '#cbd5e1' : '#475569',
                      }}
                    >
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div
                  className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                    item.type === 'shipping'
                      ? 'bg-primary-500'
                      : item.type === 'cert'
                      ? 'bg-emerald-500'
                      : item.type === 'royalty'
                      ? 'bg-rose-500'
                      : item.type === 'source'
                      ? 'bg-amber-500'
                      : 'bg-slate-400'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                    {item.action}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.target}
                  </p>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Monthly Revenue
          </h3>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <DollarSign className="text-emerald-600 dark:text-emerald-400" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                $3.45M
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                +12.5% from last month
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Total Harvest Volume
          </h3>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Wheat className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                13,200 tonnes
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                +8.3% from last month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}