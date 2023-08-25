import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
// import CustomCursor from './components/cursor/CustomCursor';
import Homepage from './pages/Main/homepage/Homepage';

function App() {
  return (
    <div className="App ">
      <Header />   
      <Homepage/>
      <Footer/>
      {/* asd */}
    </div>
  );
}

export default App;
