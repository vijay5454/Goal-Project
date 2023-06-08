import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_goals } from "../features/goalSlice";
import { reset } from "../features/goalSlice";
import { toast } from "react-toastify";

const GoalForm = () => {
  const dispatch = useDispatch();
  const { isError, message, isSuccess } = useSelector((state) => {
    return state.goals;
  });
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (message.length && !isError) {
      toast.info(message);
    }
  }, [isError, message]);
  useEffect(() => {
    if (isError || isSuccess) {
      dispatch(reset());
    }
  }, [dispatch, isError, isSuccess]);
  const [goalForm, setGoalForm] = useState({
    goalType: "",
    definition: "",
  });
  const { goalType, definition } = goalForm;
  const handleChange = (e) => {
    setGoalForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(create_goals(goalForm));
    setGoalForm({ goalType: "", definition: "" });
  };
  return (
    <form
      className="max-w-md mx-auto flex flex-col gap-4 mt-5"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Type of the Goal"
        className="px-1 py-2 border border-gray-500 rounded-md"
        id="goalType"
        name="goalType"
        value={goalType}
        onChange={handleChange}
      />
      <input
        placeholder="Definition"
        className="px-1 py-2 border border-gray-500 rounded-md"
        id="definition"
        name="definition"
        value={definition}
        onChange={handleChange}
      />
      <button
        className="bg-black text-white px-2 py-1 rounded-md"
        type="submit"
      >
        Create Goal
      </button>
    </form>
  );
};

export default GoalForm;
