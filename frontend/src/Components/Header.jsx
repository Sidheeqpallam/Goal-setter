import Login from './Login';
import Logout from './Logout';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'

function Header() {
  const { user } = useSelector( state => state.auth)
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      {user ? <Logout /> : <Login/> }
    </header>
  );
}

export default Header;
