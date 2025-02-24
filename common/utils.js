export function validateEmail(email) {
    let emailPetrn =  new RegExp(/^[^\d][\w.-]+@(?!.*\d{2}\b)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/g);
    if (!emailPetrn.test(email)) {
      return false;
    }
    return true;
}