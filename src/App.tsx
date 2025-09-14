import { useState } from 'react';
import { Button } from './components/ui/button';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { AddAssetScreen } from './components/AddAssetScreen';
import { LegacyProfileScreen } from './components/LegacyProfileScreen';
import { HeritageManagementScreen } from './components/HeritageManagementScreen';

type Screen = 'login' | 'dashboard' | 'addAsset' | 'legacyProfile' | 'heritageManagement';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  if (!isLoggedIn && currentScreen !== 'login') {
    setCurrentScreen('login');
  }

  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn && (
        <header className="border-b border-border p-4">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-2xl font-medium text-primary">GAMELORE</h1>
            <nav className="flex gap-2">
              <Button 
                variant={currentScreen === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setCurrentScreen('dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant={currentScreen === 'addAsset' ? 'default' : 'ghost'}
                onClick={() => setCurrentScreen('addAsset')}
              >
                Adicionar Ativo
              </Button>
              <Button 
                variant={currentScreen === 'legacyProfile' ? 'default' : 'ghost'}
                onClick={() => setCurrentScreen('legacyProfile')}
              >
                Perfil do Legado
              </Button>
              <Button 
                variant={currentScreen === 'heritageManagement' ? 'default' : 'ghost'}
                onClick={() => setCurrentScreen('heritageManagement')}
              >
                Herdeiros
              </Button>
              <Button 
                variant="outline"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </nav>
          </div>
        </header>
      )}

      <main className="flex-1">
        {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
        {currentScreen === 'dashboard' && <Dashboard onNavigate={setCurrentScreen} />}
        {currentScreen === 'addAsset' && <AddAssetScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'legacyProfile' && <LegacyProfileScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'heritageManagement' && <HeritageManagementScreen onNavigate={setCurrentScreen} />}
      </main>
    </div>
  );
}