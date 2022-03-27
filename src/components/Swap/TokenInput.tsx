import TokensListModal from "./TokensListModal";

import Token from "../../typings/Token";

type TokenInputProps = {
  input: string;
  onChangeInput: (input: string, isTokenA: boolean) => void;
  token: Token;
  onChangeToken: (token: Token) => void;
  balance: string;
  isTokenA: boolean;
};

const TokenInput = ({
  input,
  onChangeInput,
  token,
  onChangeToken,
  balance,
  isTokenA,
}: TokenInputProps) => {
  return (
    <div className="my-4 mb-10">
      <TokensListModal
        token={token}
        onChangeToken={onChangeToken}
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
          onFocus={(e) => e.target.select()}
          onChange={(e) => onChangeInput(e.target.value, isTokenA)}
          className="block w-full text-right text-gray-500 outline-0"
          placeholder="0.0"
        />
      </div>
    </div>
  );
};

export default TokenInput;
