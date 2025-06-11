// Regex requirement validation for passwords, emails, and names
export const validName = new RegExp(
   '^[A-Za-z\s]+$'
);

export const validEmail = new RegExp(
   '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);

export const validPassword = new RegExp(
   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'
);