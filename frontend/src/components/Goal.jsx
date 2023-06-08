const Goal = ({ goal }) => {
  const { goalType, definition, createdAt } = goal;
  return (
    <div className="px-5 py-5 shadow-lg rounded-lg">
      <h1 className="font-bold">{goalType}</h1>
      <p className="">{definition}</p>
      <p className="font-light text-sm">
        {new Date(createdAt).toLocaleString("en-UK")}
      </p>
    </div>
  );
};

export default Goal;
