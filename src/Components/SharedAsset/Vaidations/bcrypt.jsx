import bcrypt from "bcryptjs-react";

export const handelPassWordValidation = (password, userPassword) => {
  let validated = bcrypt.compareSync(
    password,
    userPassword.password
  )
  return validated
}