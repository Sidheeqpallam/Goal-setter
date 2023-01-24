import { Link } from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa";

function Logout() {
  return (
    <div>
        <ul>
        <li>
          <Link to="/logout">
            <FaSignOutAlt /> Logout
          </Link>
        </li>

        
      </ul>
    </div>
  )
}

export default Logout