import {FormEvent} from "react";

export const inputsHandler = (e: FormEvent, state: any, setFn: (o: any) => void) => {
  setFn({
    ...state,
    [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
  });
}
