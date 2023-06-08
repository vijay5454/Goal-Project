const Spinner = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0 z-50">
      <div className="w-10 h-10 border-t-2 border-black rounded-full animate-spin duration-200"></div>
    </div>
  );
};

export default Spinner;
