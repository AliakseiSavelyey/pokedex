import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FcPrevious } from 'react-icons/fc';
import s from './Details.module.css';
// import { useLocalStorage } from '../../../utils/useLocalStorage';
import Loading from '../../Loading/Loading';

const APIpokemon = 'https://pokeapi.co/api/v2/pokemon/';

const Details = ({ addToOrder }) => {
  const [pokemonName, setPokemonName] = useState([]);
  // const [pokemonName, setPokemonName] = useLocalStorage('pokemonName', []);
  const { id } = useParams();

  const getPokemon = () => {
    const pokePromises = [];
    try {
      pokePromises.push(fetch(`${APIpokemon}${id}`).then((res) => res.json()));
      Promise.all(pokePromises).then((result) => {
        const pokemonsData = result.map((data) => ({
          count: 1,
          name: data.name,
          id: data.id,
          exp: data.base_experience,
          height: data.height,
          weight: data.weight,
          image: data.sprites?.other.dream_world.front_default,
          stats: data.stats,
          type: data.types.map((e) => e.type.name).join(', '),
        }));

        setPokemonName(pokemonsData);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPokemon();
  });

  return (
    <div className={s.detailsWrap}>
      <ul className={s.pokemonWrap}>
        <Link to={'/Pokemons'}>
          <button type="button" className={s.backBtn}>
            <FcPrevious />
          </button>
        </Link>
        {pokemonName ? (
          pokemonName?.map((pokemon) => (
            <li key={pokemon.name} className={s.pokemonItem}>
              <div className={s.bodyParams}>
                <p>
                  Тип:
                  <br />
                  <span> {pokemon.type}</span>
                </p>
                <p>
                  Вес в гектограммах:
                  <span> {pokemon.weight}</span>
                </p>
                <p>
                  Рост в дециметрах:
                  <span> {pokemon.height}</span>
                </p>
              </div>
              <div className={s.nameCostParams}>
                <h1 className={s.pokemonTitle}>{pokemon.name.toUpperCase()}</h1>

                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className={s.detailsImg}
                  height="450"
                  width="450"
                ></img>
                <h3>
                  Price: $ <span>{pokemon.exp}</span>
                </h3>
                <p>Порядковый номер: {pokemon.id}</p>
                <button
                  className={s.btn}
                  onClick={() => addToOrder(pokemonName)}
                >
                  BUY NOW
                </button>
              </div>
              <div>
                <ul>
                  <p>Характеристики:</p>
                  <br />
                  {pokemon.stats?.map((e) => (
                    <li key={e.stat.name}>
                      <p>
                        {e.stat.name} : <span>{e.base_stat}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))
        ) : (
          <Loading />
        )}
      </ul>
    </div>
  );
};

export default Details;
