
// const phoneRegExp = /^[6-9]{1}[0-9]{9}$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const loginValidation = (userInput) => {
    const { Email, Password } = userInput
    const error = {};
    let isError = false;
    if (!Email.match(mailFormat)) {
        error.Email = "Enter valid email";
        isError = true;
    }
    if (!Password) {
        error.Password = "Password is requiered";
        isError = true;

    }
    if (Password && !Password.match(passwordRegExp)) {
        error.Password = "Enter valid Password";
        isError = true;
    }
    error.isError = isError;
    return error

}
export const signupValidChecker = (userInput) => {

    const { Name, Email, Password, Phone } = userInput
    const error = {};
    let isError = false;
    if (!Name) {
        error.Name = "Name is Required";
        isError = true;
    }

    if (!Email.match(mailFormat)) {

        error.Email = "Enter valid email";
        isError = true;


    }
    if (!Password.match(passwordRegExp)) {
        error.Password = "Enter valid Password"
        isError = true;
    }
    if (!Phone) {
        error.Phone = "Enter valid phone"
        isError = true;
    }
    error.isError = isError;

    return error

}