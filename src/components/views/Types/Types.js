import { useEffect, useState } from 'react';
import s from './Types.module.css';
// import { useLocalStorage } from '../../../utils/useLocalStorage';
const colors = [
  'rgba(204, 204, 255, 1)',
  'rgba(255, 204, 255, 1)',
  'rgba(204, 153, 255, 0.5)',
  'rgba(102, 51, 255, 0.5)',
  'rgba(204, 51, 255, 0.5)',
  'rgba(134, 13, 35, 0.3)',
];

const Types = () => {
  const [types, setTypes] = useState([]);
  // const [types, setTypes] = useLocalStorage('types', []);
  const [filteredData, setFilteredData] = useState([]);
  // const [filteredData, setFilteredData] = useLocalStorage('filteredData', []);

  const fetchTypes = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const pokemonTypes = await response.json();
    const typesToBtn = pokemonTypes.results.filter(
      (type) => type.name !== 'unknown' && type.name !== 'shadow'
    );
    setTypes(typesToBtn);
  };
  useEffect(() => {
    fetchTypes();
  }, []);

  const getServerSideProps = async (type) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    const filteredData = data.pokemon.map((el) => el.pokemon);

    setFilteredData(filteredData);
  };

  const handleChange = (type) => {
    getServerSideProps(type);
  };

  return (
    <div>
      <ul className={s.typesWrap}>
        {types.map((type) => (
          <li key={type.name}>
            <button
              type="button"
              className={s.typesBtn}
              style={{
                backgroundColor: colors[(Math.random() * colors.length) ^ 0],
              }}
              onClick={() => handleChange(type.name)}
            >
              {type.name}
            </button>
          </li>
        ))}
      </ul>

      <ul className={s.pokemonTypesWrap}>
        {filteredData.map((pokemon) => (
          <li key={pokemon.name}>
            <h2 className={s.pokemonName}>{pokemon.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Types;

// src={pokemon.image}
// alt={pokemon.name}
// width="240"
// height="250"
// className={s.pokemonImage}
