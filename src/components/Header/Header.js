import { Link } from 'react-router-dom';
import { FcPaid } from 'react-icons/fc';
import Navigation from '../Navigation/Navigation';
import s from './Header.module.css';

const Header = () => {
  return (
    <div className={s.wrap}>
      <Link to={'/'} className={s.logo} alt="logo"></Link>
      <Navigation />

      <Link to={'/cart'}>
        <FcPaid className={s.cart} />
      </Link>
    </div>
  );
};

export default Header;
