import { useState } from 'react';
import { Ship, MapPin, Calendar, Package, ArrowRight, Search, Filter, CheckCircle, Clock, Truck } from 'lucide-react';

const shipments = [
  {
    id: 'SHP-2024-001',
    origin: 'Mrima Hills, Kenya',
    destination: 'Mombasa Port',
    status: 'in-transit',
    departure: '2024-06-15',
    estimatedArrival: '2024-06-18',
    cargo: 'Ilmenite Concentrate',
    quantity: '2,500 tonnes',
    vessel: 'MV African Star',
  },
  {
    id: 'SHP-2024-002',
    origin: 'Mrima Hills, Kenya',
    destination: 'Dar es Salaam',
    status: 'delivered',
    departure: '2024-06-10',
    estimatedArrival: '2024-06-13',
    cargo: 'Rutile Sand',
    quantity: '1,200 tonnes',
    vessel: 'MV Indian Ocean',
  },
  {
    id: 'SHP-2024-003',
    origin: 'Mrima Hills, Kenya',
    destination: 'Durban, South Africa',
    status: 'pending',
    departure: '2024-06-25',
    estimatedArrival: '2024-07-02',
    cargo: 'Zircon Sand',
    quantity: '800 tonnes',
    vessel: 'MV Cape Hope',
  },
  {
    id: 'SHP-2024-004',
    origin: 'Mrima Hills, Kenya',
    destination: 'Mombasa Port',
    status: 'in-transit',
    departure: '2024-06-18',
    estimatedArrival: '2024-06-21',
    cargo: 'Titanium Slag',
    quantity: '3,100 tonnes',
    vessel: 'MV Kenya Pride',
  },
  {
    id: 'SHP-2024-005',
    origin: 'Mrima Hills, Kenya',
    destination: 'Lagos, Nigeria',
    status: 'delivered',
    departure: '2024-06-05',
    estimatedArrival: '2024-06-12',
    cargo: 'Monazite Concentrate',
    quantity: '450 tonnes',
    vessel: 'MV West Africa',
  },
];

const statusConfig = {
  delivered: { icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30', label: 'Delivered' },
  'in-transit': { icon: Truck, color: 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30', label: 'In Transit' },
  pending: { icon: Clock, color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30', label: 'Pending' },
};

export default function Shipping() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = shipments.filter((s) => {
    const matchesSearch = s.id.toLowerCase().includes(search.toLowerCase()) || s.cargo.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search shipments..."
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
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Shipment ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cargo</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Route</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vessel</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((shipment) => {
                const status = statusConfig[shipment.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={shipment.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-white">{shipment.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{shipment.cargo}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="truncate max-w-[120px]">{shipment.origin}</span>
                        <ArrowRight size={14} className="text-slate-400" />
                        <span className="truncate max-w-[120px]">{shipment.destination}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{shipment.quantity}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{shipment.vessel}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon size={12} />
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
