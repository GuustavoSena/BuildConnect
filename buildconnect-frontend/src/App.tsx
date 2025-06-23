import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './api/axiosInstance';
import { useSearch } from './context/SearchContext'; 

interface UserProfile {
  name: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const location = useLocation(); 

  const { setActiveSearchTerm } = useSearch();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      api.get('/users/me')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('jwt_token');
          setUser(null);
        });
    }
  }, [location]); 

  const handleLogout = () => {
      localStorage.removeItem('jwt_token');
      setUser(null);
  }

  const handleLogoClick = () => {
    setActiveSearchTerm('');
  }

  return (
    <div>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl" onClick={handleLogoClick}>
          BuildConnect
        </Link>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <span>Olá, {user.name}!</span>
              <button onClick={handleLogout} className="font-semibold text-gray-600 hover:text-gray-900">Sair</button>
            </>
          ) : (
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
              Entrar
            </Link>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;