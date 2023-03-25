import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from "./components/Home"
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';

function App() {

  return (
    <CartProvider>
      <Router>
        <Navigation/>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
          </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
