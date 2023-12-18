import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { FcList } from 'react-icons/fc';
import s from './Navigation.module.css';
import { useClickOutside } from '../../utils/useClickOutside';

const Navigation = () => {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    if (isOpen) {
      setTimeout(() => setOpen(false), 50);
    }
  });

  return (
    <>
      <nav
        className={[s['navModal'], `${isOpen ? s['active'] : ''}`].join(' ')}
        ref={menuRef}
      >
        <ul className={s.navList}>
          <li className={s.navLink}>
            <Link to="/Home">Home</Link>
          </li>
          <li className={s.navLink}>
            <Link to="/Pokemons">Pokemons</Link>
          </li>
          <li className={s.navLink}>
            <Link to="/Types">Types</Link>
          </li>
          <li className={s.navLink}>
            <Link to="/Items">Items</Link>
          </li>
        </ul>
      </nav>
      <button className={s.navModalBtn} onClick={() => setOpen(!isOpen)}>
        <FcList />
      </button>
    </>
  );
};

export default Navigation;
