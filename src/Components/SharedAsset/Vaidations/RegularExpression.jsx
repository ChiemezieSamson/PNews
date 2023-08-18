

// regular expression that allows only text (no symbols, no numbers, no space)
export const textOnly = (value) => {
  const textOnlyRegex = /^[a-zA-Z]{2,}$/;

  const isValid = textOnlyRegex.test(value);

  return {isValid: isValid}
}

// regular expression that allows only letters and numbers (no symbols)
export const textAndNumberOnly = (value) => {
  const alphanumericRegex = /^[a-zA-Z0-9]{2,}$/

  const isValid = alphanumericRegex.test(value);

  return {isValid: isValid}
}


// regular expression that allows only email
export const handleEmailPattern = (value) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail = emailPattern.test(value);

  return {isValid: isValidEmail}
}

// regular expression that allows Password of text,symblo,upperCase,LowerCase,number
export const handleUserPassword = (value) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isValid = passwordRegex.test(value);

  return {isValid: isValid}
}


// searching for a link included into the comment box.
export const commentText = (comment) => {
  const commentContent = comment
  const linkPattern = /(https?:\/\/[^\s]+)/g;  // regular expressions
  let Content

  // if the textarea content has a link add it inside a link tag
  if (commentContent.match(linkPattern)) {
    const modifiedText = commentContent.replace(linkPattern, 
      `<a href="$&" target={"_blank"}
          class="text-blue-500 active:text-blue-400 cursor-pointer visited:text-purple-400">$&</a>`);

    Content = modifiedText   
  } else {

    Content = commentContent
  }    
  
  return {text: Content}
}
