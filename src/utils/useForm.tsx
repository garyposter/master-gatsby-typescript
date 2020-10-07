import React, { useState } from "react";

interface Mapping {
  [key: string]: number | string;
}

export default function useForm(
  defaults: Mapping
): [Mapping, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [values, setValues] = useState(defaults);
  function updateValue(e: React.ChangeEvent<HTMLInputElement>) {
    let value: number | string = e.target?.value;
    if (e.target?.type === "number") {
      value = parseInt(value);
    }
    setValues({
      ...values,
      [e.target?.name || ""]: value,
    });
  }
  return [values, updateValue];
}
