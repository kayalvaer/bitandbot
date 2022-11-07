import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Cart from "./scenes/cart/Cart";
import ConfirmOrder from "./scenes/cart/ConfirmOrder";
import GameDetails from "./scenes/gameDetails/GameDetails";
import Home from "./scenes/home/Home";
import CartList from "./scenes/shared/CartList";
import Nav from "./scenes/shared/Navbar";

const ScrollTotop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <ScrollTotop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="game/:gameId" element={<GameDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="cart/success" element={<ConfirmOrder />} />
        </Routes>
        <CartList />
      </BrowserRouter>
    </div>
  );
}

export default App;
