import s from './Home.module.css';
// import { useLocalStorage } from '../../../utils/useLocalStorage';
import VideoSection from '../../VideoSection/VideoSection';
import { useState } from 'react';

const Home = () => {
  const [findPokemon, setFindPokemon] = useState([]);
  // const [findPokemon, setFindPokemon] = useLocalStorage('findPokemon', []);
  const [canRender, setCanRender] = useState( false);
  // const [canRender, setCanRender] = useLocalStorage('canRender', false);
  const [searchValue, setSearchValue] = useState('');
  // const [searchValue, setSearchValue] = useLocalStorage('searchValue');

  const fetchPokemonToFind = async (pokemonId) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const pokemonData = await response.json();
      setCanRender(true);
      setFindPokemon(pokemonData);
    } catch (error) {
      console.log(error);
    }
  };

  const searchForm = (e) => {
    e.preventDefault();
    fetchPokemonToFind(searchValue);
  };

  const searchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <main className={s.main}>
        <div className={s.pokemonCardWrap}>
          <h3 className={s.formTitle}>Enter pokemon number</h3>
          <form className={s.searchForm}>
            <label>
              <input
                type="text"
                className={s.searchInput}
                onChange={searchInput}
                max={649}
                min={1}
                placeholder="Max value 1009"
                name="findPokemon"
              />
            </label>
            <button type="submit" className={s.searchBtn} onClick={searchForm}>
              Find Pokemon
            </button>
          </form>
          {canRender && (
            <div className={s.pokemonCardData}>
              <div>
                <p>
                  Тип:
                  <br />
                  <span>
                    {findPokemon.types.map((e) => e.type.name).join(', ')}
                  </span>
                </p>
                <p>
                  Вес в гектограммах:
                  <span> {findPokemon.weight}</span>
                </p>
                <p>
                  Рост в дециметрах:
                  <span> {findPokemon.height}</span>
                </p>
              </div>
              <div>
                <h1 className={s.pokemonName}>
                  {findPokemon.name.toUpperCase()}
                </h1>
                <img
                  src={
                    findPokemon?.sprites.other['official-artwork'].front_default
                  }
                  alt={findPokemon.name}
                  className={s.pokemonImage}
                ></img>
                <h3 className={s.pokemonPrice}>
                  Price: $ <span>{findPokemon.base_experience}</span>
                </h3>
                <p>Порядковый номер: {findPokemon.id}</p>
              </div>
              <div>
                <ul>
                  <p>Характеристики:</p>
                  <br />
                  {findPokemon.stats?.map((e) => (
                    <li key={e.stat.name}>
                      <p>
                        {e.stat.name} : <span>{e.base_stat}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <VideoSection />
        <div className={s.mainImage}></div>
      </main>
    </div>
  );
};

export default Home;
