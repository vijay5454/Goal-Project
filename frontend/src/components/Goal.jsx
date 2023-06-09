import { useEffect } from "react";
import { delete_goals, reset } from "../features/goalSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { get_goals } from "../features/goalSlice";

const Goal = ({ goal }) => {
  const { _id, goalType, definition, createdAt } = goal;
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => {
    return state.goals;
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(get_goals());
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);
  return (
    <div className="px-5 py-5 shadow-lg rounded-lg">
      <div className="flex justify-end items-center">
        <button
          onClick={() => {
            dispatch(delete_goals(_id));
          }}
        >
          <RiDeleteBin6Line />
        </button>
      </div>
      <h1 className="font-bold">{goalType}</h1>
      <p className="">{definition}</p>
      <p className="font-light text-sm">
        {new Date(createdAt).toLocaleString("en-UK")}
      </p>
    </div>
  );
};

export default Goal;
