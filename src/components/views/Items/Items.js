import { useEffect, useState } from 'react';
import s from './Items.module.css';
// import { useLocalStorage } from '../../../utils/useLocalStorage';
import Loading from '../../Loading/Loading';

const urlItems = `https://pokeapi.co/api/v2/item/`;

const Items = () => {
  const [getItems, setGetItems] = useState([]);
  // const [getItems, setGetItems] = useLocalStorage('getItems', []);

  const fetchItems = async () => {
    const res = await fetch(`${urlItems}?limit=150`);
    const data = await res.json();
    const items = data.results.map((result, index) => ({
      name: result.name,
      pokemonURL: result.url,
      id: index + 1,
      // image: result.sprites.default,
    }));
    setGetItems(items);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  // `https://pokeapi.co/media/sprites/items/${
  //   index + 1
  // }.png`

  return (
    <div>
      <ul className={s.itemsList}>
        {getItems === false ? (
          <Loading />
        ) : (
          getItems.map((e) => (
            <li key={e.name}>
              <h1 className={s.pokemonTitle}>{e.name.toUpperCase()}</h1>
              {/* <img
                src={e.image}
                alt={e.name}
                width="240"
                height="250"
                className={s.pokemonImage}
              /> */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Items;
