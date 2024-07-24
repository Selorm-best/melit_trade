import {Outlet} from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ScrollToTop from "./components/ScrollToTop";



function App() {
  return (
    <div className="App">
     
      <ScrollToTop />
       <Header/>
       <Outlet />
       <Footer/>
    </div>
  );
}

export default App;
