import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => {
    return state.auth;
  });
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <section className="">
        <h1 className="font-bold text-2xl md:text-4xl">
          Welcome {user && user.name}
        </h1>
        <p className="mt-3 md:mt-5">Goals DashBoard</p>
      </section>
      <GoalForm />
    </>
  );
};

export default Dashboard;
