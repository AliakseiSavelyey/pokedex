import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useLocalStorage } from './utils/useLocalStorage';
import Header from './components/Header/Header';
import Home from './components/views/Home/Home';
import NotFoundView from './components/views/NotFoundView/NotFoundView';
import Pokemons from './components/views/Pokemons/Pokemons';
import Details from './components/views/Details/Details';
import Cart from './components/views/Cart/Cart';
import Footer from './components/Footer/Footer';
import Types from './components/views/Types/Types';
import Items from './components/views/Items/Items';
import { useState } from 'react';

function App() {
  const [orders, setOrders] = useState([]);
  // const [orders, setOrders] = useLocalStorage('orders', []);

  const addToOrder = (pokemonName) => {
    let pokemonInCart = false;
    orders.forEach((el) => {
      if (el.id === pokemonName[0].id) {
        pokemonInCart = true;
      }
    });
    if (!pokemonInCart) setOrders([...orders, pokemonName[0]]);
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((el) => el.id !== id));
  };

  return (
    <>
      <Header />

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Pokemons" element={<Pokemons />} />
        <Route path="/Types" element={<Types />} />
        <Route path="/Items" element={<Items />} />
        <Route
          path="/Details/:id"
          element={<Details addToOrder={addToOrder} />}
        />
        <Route
          path="/Cart"
          element={<Cart orders={orders} deleteOrder={deleteOrder} />}
        />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
