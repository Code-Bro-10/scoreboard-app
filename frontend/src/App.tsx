import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LiveMatchGrid } from './components/dashboard/LiveMatchGrid';
import { MatchDetails } from './components/match/MatchDetails';
import { HeroSection } from './components/dashboard/HeroSection';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route element={<ProtectedRoute />}>
        <Route 
          path="/" 
          element={
            <AppLayout>
              <div className="space-y-6">
                <HeroSection />
                <div className="mb-4 flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Live Matches</h2>
                    <p className="text-sm text-gray-400">Current cricket action around the world</p>
                  </div>
                </div>
                <LiveMatchGrid />
              </div>
            </AppLayout>
          } 
        />
        <Route 
          path="/match/:id" 
          element={
            <AppLayout>
              <MatchDetails />
            </AppLayout>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;
