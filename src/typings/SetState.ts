import { Dispatch, SetStateAction } from "react";

type SetState<T> = Dispatch<SetStateAction<T>>;

export default SetState;
