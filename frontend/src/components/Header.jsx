import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Header = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  return (
    <header className="flex justify-between items-center py-5 border-b-2 border-gray-300 mb-8 md:py-8">
      <div>
        <Link to="/" className="hover:text-gray-700">
          GoalSetter
        </Link>
      </div>
      <ul className="flex justify-between items-center space-x-5">
        {user ? (
          <button
            className="px-5 py-2 bg-black text-white rounded-lg flex justify-center items-center gap-2"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <FaSignOutAlt />
            Logout
          </button>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
