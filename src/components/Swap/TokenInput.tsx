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
      <div className="p-4 mt-4 rounded-md shadow-md">
        <input
          type="text"
          minLength={1}
          maxLength={7}
          inputMode="decimal"
          name="amount"
          id="amount"
          value={input}
          onFocus={(e) => e.target.select()}
          onChange={(e) => onChangeInput(e.target.value, isTokenA)}
          className="block w-full text-right outline-0 text-gray-500 dark:text-gray-200 bg-inherit"
          disabled={token?.address ? false : true}
          placeholder="0.0"
        />
      </div>
    </div>
  );
};

export default TokenInput;
