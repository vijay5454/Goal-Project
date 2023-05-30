import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-5 border-b-2 border-gray-300 mb-8 md:py-8">
      <div>
        <Link to="/" className="hover:text-gray-700">
          GoalSetter
        </Link>
      </div>
      <ul className="flex justify-between items-center space-x-5">
        <li className="">
          <Link
            to="login"
            className="flex justify-between items-center gap-3 hover:text-gray-700"
          >
            <FaSignInAlt />
            Login
          </Link>
        </li>
        <li>
          <Link
            to="register"
            className="flex justify-between items-center gap-3 hover:text-gray-700"
          >
            <FaUser />
            Register
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
