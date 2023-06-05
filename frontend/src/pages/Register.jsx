import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isLoading, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log(formData);
      toast.error("Password does not Match!");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="">
        <h1 className="text-4xl flex justify-center items-center gap-2 md:gap-5 font-bold">
          <FaUser />
          Register
        </h1>
        <p className="mt-2 tracking-wide md:mt-5 font-bold text-gray-500">
          Please Create an Account
        </p>
      </section>
      <section className="max-w-md mx-auto mt-10">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-500 py-3 px-2 mx-3 placeholder:font-light"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
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
          <input
            type="password"
            id="password2"
            name="password2"
            className="border border-gray-500 py-3 px-2 mx-3 placeholder:font-light"
            placeholder="Confirm Password"
            onChange={onChange}
            value={password2}
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

export default Register;
