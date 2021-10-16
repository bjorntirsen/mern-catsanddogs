export const formValidateMessage = (submitedFileds, type) => {
  let fields = [];
  if (type === "signup") {
    fields = [
      "fullName",
      "email",
      "phone",
      "address",
      "password",
      "passwordConfirm",
    ];
  } else if (type === "login") {
    fields = ["email", "password"];
  }

  let isThereEmptyField = false;
  //This checks if there is any empty field
  fields.forEach((field) => {
    if (
      submitedFileds[field] === "" ||
      typeof submitedFileds[field] === "undefined"
    ) {
      isThereEmptyField = true;
    }
  });

  if (isThereEmptyField) return "No empty fields";

  //This will check if passwords match only for the signup type
  if (
    typeof submitedFileds.passwordConfirm !== undefined &&
    submitedFileds.password !== submitedFileds.passwordConfirm
  )
    return "Passwords don't match";

  //This will check if email is in a write format
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(submitedFileds.email))
    return "Not a valid Email address";

  return "validates";
};
