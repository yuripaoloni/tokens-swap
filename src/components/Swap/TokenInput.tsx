import TokensListModal from "./TokensListModal";

import Token from "../../typings/Token";

type TokenInputProps = {
  input: string;
  handleAmountChange: (input: string, isTokenA: boolean) => void;
  token: Token;
  handleTokenChange: (token: Token, isTokenA: boolean) => void;
  balance: string;
  isTokenA: boolean;
};

const TokenInput = ({
  input,
  handleAmountChange,
  token,
  handleTokenChange,
  balance,
  isTokenA,
}: TokenInputProps) => {
  return (
    <div className="my-4 mb-12">
      <TokensListModal
        token={token}
        handleTokenChange={handleTokenChange}
        isTokenA={isTokenA}
        balance={balance}
      />
      <div className="p-4 mt-4 border-[1px] rounded-md shadow-md">
        <input
          type="text"
          inputMode="decimal"
          name="amount"
          id="amount"
          value={input}
          onChange={(e) => handleAmountChange(e.target.value, isTokenA)}
          className="block w-full text-right text-gray-500 outline-0"
          placeholder="0.0"
        />
      </div>
    </div>
  );
};

export default TokenInput;
