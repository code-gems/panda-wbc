export const minValue = (value: number, min: number): number => value < min ? min : value;

export const maxValue = (value: number, max: number): number => value > max ? max : value;

export const getMonths = (): string[] => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getFullMonths = (): string[] => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDaysOfWeek = (): string[] => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getFullDaysOfWeek = (): string[] => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
