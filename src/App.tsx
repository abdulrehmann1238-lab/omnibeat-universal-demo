import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AppProvider } from './context/AppContext';

// Website
import { LandingPage } from './pages/website/LandingPage';

// App Shell & Pages
import { AppLayout } from './components/app/AppLayout';
import { DashboardPage } from './pages/app/DashboardPage';
import { ConnectPage } from './pages/app/ConnectPage';
import { LiveDetectionPage } from './pages/app/LiveDetectionPage';
import { ActiveGamesPage } from './pages/app/ActiveGamesPage';
import { EventActivityPage } from './pages/app/EventActivityPage';
import { DiagnosticsPage } from './pages/app/DiagnosticsPage';
import { SettingsPage } from './pages/app/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppProvider>
          <Routes>
            {/* Public Website */}
            <Route path="/" element={<LandingPage />} />

            {/* Interactive Desktop Application Shell */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="connect" element={<ConnectPage />} />
              <Route path="live" element={<LiveDetectionPage />} />
              <Route path="games" element={<ActiveGamesPage />} />
              <Route path="activity" element={<EventActivityPage />} />
              <Route path="diagnostics" element={<DiagnosticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;

