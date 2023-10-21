import { FaTrash } from 'react-icons/fa';
import s from './Cart.module.css';
// import { useLocalStorage } from '../../../utils/useLocalStorage';
import { useState } from 'react';

const Cart = ({ orders, deleteOrder }) => {
  const [count, setCount] = useState(orders);
  // const [count, setCount] = useLocalStorage('count', orders);
  let total = 0;
  orders.forEach((el) => (total += Number.parseFloat(el.exp) * el.count));

  const increment = (pokeId) => {
    setCount(
      orders.map(
        (el) => el.count >= 1 && (el.id === pokeId ? (el.count += 1) : el.count)
      )
    );
  };

  const decrement = (pokeId) => {
    setCount(
      orders.map(
        (el) => el.count > 1 && (el.id === pokeId ? (el.count -= 1) : el.count)
      )
    );
  };

  return (
    <div className={s.cartWrap}>
      <ul>
        <div className={s.counterTotalWrap}>
          <h3>Pokemon in Cart</h3>
          {orders.length > 0 && (
            <p className={s.totalCost}>
              Total Price:
              <span> $ {new Intl.NumberFormat().format(total)}</span>
            </p>
          )}
        </div>
        {orders.length > 0 ? (
          <div>
            {orders.map((e) => (
              <li key={e.id}>
                <div className={s.pokemonCartWrap}>
                  <h2 className={s.pokemonName}>
                    Name: {e.name.toUpperCase()}
                  </h2>
                  <img src={e.image} alt={e.name} height="250" width="250" />
                  <h2>Price for each: $ {e.exp}</h2>
                  <h2>Price: $ {e.exp * e.count}</h2>
                  <div className={s.counterWrap}>
                    <button
                      type="button"
                      className={s.cartBtn}
                      onClick={() => decrement(e.id)}
                    >
                      -
                    </button>
                    <span>{e.count}</span>
                    <button
                      type="button"
                      className={s.cartBtn}
                      onClick={() => increment(e.id)}
                    >
                      +
                    </button>
                  </div>
                  <FaTrash
                    className={s.pokemonTrash}
                    onClick={() => deleteOrder(e.id)}
                  />
                </div>
              </li>
            ))}
          </div>
        ) : (
          <h2 className={s.emptyСartTitle}>КОРЗИНА ПУСТА</h2>
        )}
      </ul>
    </div>
  );
};

export default Cart;
