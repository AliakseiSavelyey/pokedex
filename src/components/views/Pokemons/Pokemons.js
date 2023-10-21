import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './Pokemons.module.css';
// import { useLocalStorage } from '../../../utils/useLocalStorage';
import Loading from '../../Loading/Loading';

const url = `https://pokeapi.co/api/v2/pokemon/`;

const colors = [
  'rgba(204, 204, 255, 1)',
  'rgba(255, 204, 255, 1)',
  'rgba(204, 153, 255, 0.5)',
  'rgba(102, 51, 255, 0.5)',
  'rgba(204, 51, 255, 0.5)',
  'rgba(134, 13, 35, 0.3)',
];

const Pokemons = () => {
  const [getPokemons, setGetPokemons] = useState([]);
  // const [getPokemons, setGetPokemons] = useLocalStorage('getPokemons', []);

  const fetchPokemons = async () => {
    const res = await fetch(`${url}?limit=150`);
    const data = await res.json();
    const pokemon = data.results.map((result, index) => ({
      name: result.name,
      pokemonURL: result.url,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    }));
    setGetPokemons(pokemon);
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      <ul className={s.pokemonWrap}>
        {getPokemons===false ? (
          <Loading />
        ) : (
          getPokemons.map((e) => (
            <li
              key={e.name}
              className={s.pokemonItem}
              style={{
                backgroundColor: colors[(Math.random() * colors.length) ^ 0],
              }}
            >
              <h1 className={s.pokemonTitle}>{e.name.toUpperCase()}</h1>
              <img
                src={e.image}
                alt={e.name}
                width="240"
                height="250"
                className={s.pokemonImage}
              />
              <Link to={`/Details/${e.id}`}>
                <button className={s.btn}>VIEW DETAILS AND BUY</button>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Pokemons;
