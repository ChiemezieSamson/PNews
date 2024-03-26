// regular expression that allows only text (no symbols, no numbers, no space)
export const textOnly = (value) => {
  const textOnlyRegex = /^[a-zA-Z]{2,}$/;
  const noEmailOrURLRegex = /^((?!(www\.|http:\/\/|https:\/\/))[^\s@]+[^\s@]*[^@]+)$/i;

  let isValid 

  if(textOnlyRegex.test(value) && noEmailOrURLRegex.test(value)){

    isValid = true
  } else {

    isValid = false
  }

  return {isValid: isValid}
}


// regular expression that allows only letters, space and numbers (no symbols)
export const textSpaceAndNumber = (value) => {
  const alphanumericRegex = /^[a-zA-Z0-9\s*]{2,}$/
  
  const noEmailOrURLRegex = /^((?!(www\.|http:\/\/|https:\/\/))[^\s@]+[^\s@]*[^@]+)$/i

  let isValid 

  if(alphanumericRegex.test(value) && noEmailOrURLRegex.test(value)){

    isValid = true
  } else {

    isValid = false
  }

  return {isValid: isValid}
}


// regular expression that allows only letters, space and numbers (no symbols)
export const textSpaceNumberAndSpecialCharater = (value) => {  
  const noEmailOrURLRegex = /^((?!(www\.|http:\/\/|https:\/\/))[^\s@]+[^\s@]*[^@]+)$/i

  let isValid 

  if(noEmailOrURLRegex.test(value)){

    isValid = true
  } else {

    isValid = false
  }

  return {isValid: isValid}
}


// regular expression that allows only letters and numbers (no symbols)
export const textAndNumberOnly = (value) => {
  const alphanumericRegex = /^[a-zA-Z0-9]{2,}$/
  const noEmailOrURLRegex = /^((?!(www\.|http:\/\/|https:\/\/))[^\s@]+[^\s@]*[^@]+)$/i;

  let isValid 

  if(alphanumericRegex.test(value) && noEmailOrURLRegex.test(value)){

    isValid = true
  } else {

    isValid = false
  }

  return {isValid: isValid}
}


// regular expression that allows only email
export const handleEmailPattern = (value) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail = emailPattern.test(value);

  return {isValid: isValidEmail}
}


// A regular expression for phone numbers 
export const handlePhoneNumbers = (value) => {
  const phoneNumberPattern =  /^\+\d{1,3}\s\d{11}$/;

  const isValidPhoneNumber = phoneNumberPattern.test(value);

  return {isValid: isValidPhoneNumber}
}


// A regular expression for url links 
export const handleUrlLinks = (value) => {
  const websitePattern = /^(https?:\/\/)?([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/;
  const multipleLinksPattern = /^https?:\/\/[^\s]+/g;

  const hasMultipleLinks = value.match(multipleLinksPattern)?.length > 1;
  const isValidWebsite = !hasMultipleLinks && websitePattern.test(value);

  return {isValid: isValidWebsite}
}


// regular expression that allows Password of text,symblo,upperCase,LowerCase,number
export const handleUserPassword = (value) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isValid = passwordRegex.test(value);

  return {isValid: isValid}
}


//  regular expression living addresses 
export const livingaddress = (value) => {
  const addressRegx = /^(?!.*(?:\b(?:https?|ftp):\/\/|www\.|@\w+\.\w+\b)).+$/

  const isValid = addressRegx.test(value);

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
