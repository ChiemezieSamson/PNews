import bcrypt from "bcryptjs-react";

export const handelPassWordValidation = (password, userPassword) => {

  const validated = bcrypt.compareSync( // making sure that the two password are the same
    password,
    userPassword.password
  )

  return validated
}