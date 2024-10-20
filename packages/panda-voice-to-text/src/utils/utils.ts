// types
// ...

export const minValue = (value: number, min: number): number => value < min ? min : value;

export const isEmpty = (value: any): boolean => {
	return value === null || value === "" || value === undefined;
}