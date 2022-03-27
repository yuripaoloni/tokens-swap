const SwapHeader = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-full text-center mx-auto py-6 px-4">
        <h1 className="text-lg tracking-tight font-extrabold text-gray-900 ">
          <span className="block md:inline md:text-left">
            <span className="text-indigo-600">1. </span>
            <span className="mr-4">Select tokens</span>
            <span className="text-indigo-600">2. </span>
            <span className="mr-4">Insert amount</span>
          </span>
          <span className="block md:inline md:text-left">
            <span className="text-indigo-600">3. </span>
            <span className="mr-4">Confirm transaction</span>
            <span className="text-indigo-600">4. </span>
            <span className="mr-4">Swap done</span>
          </span>
        </h1>
      </div>
    </header>
  );
};

export default SwapHeader;
