import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import DailyLog from './pages/DailyLog';
import BaiTest from './pages/BaiTest';
import Tools from './pages/Tools';
import Goals from './pages/Goals';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registro-diario" element={<DailyLog />} />
        <Route path="/inventario-ansiedade" element={<BaiTest />} />
        <Route path="/ferramentas" element={<Tools />} />
        <Route path="/objetivos" element={<Goals />} />
        <Route path="/configuracoes" element={<Settings />} />
      </Routes>
    </Layout>
  );
};

export default App;
