import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );
  const onChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess || user) {
      toast.info("Login Successful!");
      navigate("/");
      dispatch(reset());
    }
  }, [isError, message, isSuccess, user, dispatch, navigate, isLoading]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="">
        <h1 className="text-4xl flex justify-center items-center gap-2 md:gap-5 font-bold">
          <FaSignInAlt />
          Login
        </h1>
        <p className="mt-2 tracking-wide md:mt-5 font-bold text-gray-500">
          Login and Start setting goals
        </p>
      </section>
      <section className="max-w-md mx-auto mt-10">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-500 py-3 px-2 mx-3 placeholder:font-light"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-500 py-3 px-2 mx-3 placeholder:font-light"
            placeholder="Password"
            onChange={onChange}
            value={password}
          />
          <button
            className="py-4 bg-black text-white mx-3 active:bg-white active:text-black transition-all duration-200"
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
