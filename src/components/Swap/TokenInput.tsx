import SetState from "../../typings/SetState";

type TokenInputProps = {
  input: string;
  setInput: SetState<string>;
};

const TokenInput = ({ input, setInput }: TokenInputProps) => {
  return (
    <div className="p-4 mt-4 border-[1px] rounded-md shadow-md">
      <input
        type="text"
        inputMode="decimal"
        name="amount"
        id="amount"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="block w-full text-right text-gray-500 outline-0"
        placeholder="0.0"
      />
    </div>
  );
};

export default TokenInput;
