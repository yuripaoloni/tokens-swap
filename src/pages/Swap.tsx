import SwapHeader from "../components/Swap/SwapHeader";
import TokenInput from "../components/Swap/TokenInput";
import TokensListModal from "../components/Swap/TokensListModal";

const Swap = () => {
  return (
    <div>
      <SwapHeader />
      <main>
        <div className="max-w-md mx-auto pt-10 sm:px-6 lg:px-8">
          <div className="shadow-xl rounded-3xl h-[480px] border-2">
            <div className="border-b-[1px] border-gray-200 p-3">
              <p className="text-lg font-bold text-center">Swap</p>
              <p className="text-gray-500 text-center text-sm">
                Swap instantly any BEP-20 token
              </p>
            </div>
            <div className="p-4">
              <div className="my-4 mb-12">
                <TokensListModal />
                <TokenInput />
              </div>
              <div className="my-4 mb-10">
                <TokensListModal />
                <TokenInput />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="place-content-center py-2 px-6 text-sm font-bold text-white bg-indigo-600 rounded-md bg-opacity-85 hover:bg-opacity-70 "
                >
                  SWAP
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Swap;
