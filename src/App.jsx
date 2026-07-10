import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

const pageTitles = {
  '/': 'Dashboard',
};

function Layout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Mrima Hills';

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/mineral-sources" element={<MineralSources />} />
            <Route path="/royalties" element={<Royalties />} />
            <Route path="/harvesting" element={<Harvesting />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App