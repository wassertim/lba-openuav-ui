import {FormEvent} from "react";

export const inputsHandler = (e: FormEvent, setFn: (o: any) => void) => {
  setFn({[(e.target as HTMLInputElement).name]: +(e.target as HTMLInputElement).value});
}
