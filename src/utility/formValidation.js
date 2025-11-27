

export const isRequired = value => value.trim() === '' ? false : true;

export const isBetween = (value,min,max) => value >= min && value <= max;
