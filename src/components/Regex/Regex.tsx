export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const validPassword = new RegExp(
  "^(?=.*[A-Za-z0-9])[A-Za-z0-9@$!%*#?&^_-]{8,17}$"
);

export const validId = new RegExp(
  "^[0-9]{13}$"
);

export const validCellNum = new RegExp("^(0)[0-9]{9}$");

export const validName = new RegExp(
  "^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(.?)$"
);

export const validPostalCode = new RegExp("^[0-9]{4}$");
