import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import PublicRouter from './routers/PublicRouter';
import ScrollToTopOnRouteChange from './routers/ScrollToTopOnRouteChange';
import ScrollToTopButton from './components/buttons/ScrollToTopButton/ScrollToTopButton';

function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="App">
      <ScrollToTopOnRouteChange />
      {!isAdmin && <Header />}
      <PublicRouter />
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTopButton />}
    </div>
  );
}

export default App;
