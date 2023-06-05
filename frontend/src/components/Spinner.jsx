const Spinner = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black z-50">
      <div className="w-10 h-10 border border-black rounded-full animate-spin duration-200"></div>
    </div>
  );
};

export default Spinner;
