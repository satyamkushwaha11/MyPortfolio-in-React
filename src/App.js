import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import PublicRouter from './routers/PublicRouter';
import RouteScrollManager from './routers/RouteScrollManager';
import ScrollToTopButton from './components/buttons/ScrollToTopButton/ScrollToTopButton';
import CustomCursor from './components/cursor/CustomCursor';
import { ADMIN_ENABLED } from './pages/admin/adminAuth';

function App() {
  const { pathname } = useLocation();
  // Only treat /admin as the chrome-less admin view when admin is actually
  // enabled (dev). In production /admin 404s and should show the normal layout.
  const isAdmin = ADMIN_ENABLED && pathname.startsWith('/admin');

  return (
    <div className="App">
      <CustomCursor />
      <RouteScrollManager />
      {!isAdmin && <Header />}
      <PublicRouter />
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTopButton />}
    </div>
  );
}

export default App;
