export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const values: Array<string | number> = [];

  const flatten = (value: ClassValue): void => {
    if (Array.isArray(value)) {
      value.forEach(flatten);
    } else if (typeof value === "string" || typeof value === "number") {
      values.push(value);
    }
  };

  inputs.forEach(flatten);
  return values.join(" ");
}
