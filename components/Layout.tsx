import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Activity, PenTool, Target, Settings, Menu, X, HeartPulse } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/registro-diario', label: 'Registro Diário', icon: PenTool },
    { path: '/inventario-ansiedade', label: 'Inventário de Beck', icon: ClipboardList },
    { path: '/ferramentas', label: 'Ferramentas', icon: Activity },
    { path: '/objetivos', label: 'Objetivos', icon: Target },
    { path: '/configuracoes', label: 'Configurações', icon: Settings },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans text-slate-700">
      {/* Safety Banner */}
      <div className="fixed top-0 left-0 right-0 bg-teal-700 text-white text-xs text-center py-1 z-50 px-2">
        Este aplicativo não substitui avaliação ou tratamento profissional em saúde mental. Em caso de crise, busque ajuda imediata.
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-6 w-full bg-white z-40 border-b border-slate-200 flex items-center justify-between p-4 shadow-sm">
        <div className="flex items-center gap-2 text-teal-600 font-bold text-lg">
          <HeartPulse size={24} />
          <span>Planner</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed top-6 bottom-0 z-30 overflow-y-auto">
        <div className="p-6 flex items-center gap-2 text-teal-600 font-bold text-2xl">
          <HeartPulse size={32} />
          <span>Planner</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-white z-30 p-4 md:hidden overflow-y-auto">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl text-lg ${
                  location.pathname === item.path
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-600'
                }`}
              >
                <item.icon size={24} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 mt-[64px] md:mt-[24px] p-4 md:p-8 pb-20 md:pb-8 overflow-y-auto min-h-[calc(100vh-24px)]">
        <div className="max-w-4xl mx-auto space-y-6">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
