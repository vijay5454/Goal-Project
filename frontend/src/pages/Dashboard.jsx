import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import { useDispatch } from "react-redux";
import { get_goals, reset } from "../features/goalSlice";
import Spinner from "../components/Spinner";
import Goal from "../components/Goal";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const { goalsList, isLoading } = useSelector((state) => {
    return state.goals;
  });
  useEffect(() => {
    dispatch(get_goals());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  }, [user, navigate]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="">
        <h1 className="font-bold text-2xl md:text-4xl">
          Welcome {user && user.name}
        </h1>
        <p className="mt-3 font-semibold text-2xl text-gray-500">
          Goals DashBoard
        </p>
      </section>
      <GoalForm />
      <section className="mt-5">
        {goalsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3">
            {goalsList.map((goal) => {
              return <Goal key={goal._id} goal={goal} />;
            })}
          </div>
        ) : (
          <h3>You have not set any Goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
