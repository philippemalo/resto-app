const isValidEmail = (input: string) => {
  return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
    input
  );
};

const isValidPassword = (input: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input);
};

const utils = {
  isValidEmail,
  isValidPassword,
};

export default utils;
