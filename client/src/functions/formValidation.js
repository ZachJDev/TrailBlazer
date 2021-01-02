// From https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
// eslint-disable-next-line
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const errorMessages = {
  PARK_NAME: "Park Name is Too Short",
  PARK_DESC: "Park Description is Too Short",
  PARK_ADDRESS: "Park Address is Too Short",
  PARK_CITY: "Park City is too short",
  PARK_ST: "States must be two letters",
  PARK_ZIP: "Zip codes must be five digits",
  PARK_COUNTRY: "Country is too short",
  TRAIL_NAME: "Trail Name is Too Short",
  TRAIL_DESC: "Trail Description is Too Short",
  TRAIL_LENGTH: "Trail Length must be greater than 0",
  PASSWORD_MATCH: "Confirm Password field must match Password field",
  INVALID_PASSWORD: "Password must be at least 3 characters long",
  INVALID_EMAIL: "Invalid Email Address",
  INVALID_USERNAME: "Username too short",
};

const validateNotEmpty = (text) => text.length > 0;

const validateFormEntry = (entry, errorCode, validation) => {
  if (!validation(entry)) {
    throw new Error(errorCode);
  }
  return true;
};

export const validateNewParkForm = (
  {
    newParkName,
    newParkDescription,
    newParkAddress,
    newParkCity,
    newParkState,
    newParkZipCode,
    newParkCountry,
  },
  errorHandler
) => {
  try {
    validateFormEntry(newParkName, "PARK_NAME", validateNotEmpty);
    validateFormEntry(newParkDescription, "PARK_DESC", validateNotEmpty);
    validateFormEntry(newParkAddress, "PARK_ADDRESS", validateNotEmpty);
    validateFormEntry(newParkCity, "PARK_ CITY", validateNotEmpty);
    validateFormEntry(newParkCountry, "PARK_COUNTRY", validateNotEmpty);
    validateFormEntry(newParkState, "PARK_ST", (val) => val.length === 2);
    validateFormEntry(newParkZipCode, "PARK_ZIP", (val) => val.length === 5);
    return true;
  } catch (e) {
    errorHandler(errorMessages[e.message]);
    return false;
  }
};

export const validateNewTrailForm = (
  { newTrailName, newTrailDescription, newTrailLength },
  errorHandler
) => {
  try {
    validateFormEntry(newTrailName, "TRAIL_NAME", validateNotEmpty);
    validateFormEntry(newTrailDescription, "TRAIL_DESC", validateNotEmpty);
    validateFormEntry(newTrailLength, "TRAIL_LENGTH", (val) => val > 0);
    return true;
  } catch (e) {
    errorHandler(errorMessages[e.message]);
    return false;
  }
};

export const validateSignUpForm = (
  {
    password,
    confirmPassword,
    emailAddress,
    username,
  },
  errorHandler
) => {
  try {
    validateFormEntry(username, 'INVALID_USERNAME', validateNotEmpty);
    validateFormEntry(password, 'INVALID_PASSWORD', (val) => val.length > 3);
    validateFormEntry(emailAddress, 'INVALID_EMAIL', (val) => emailRegex.test(val));
    validateFormEntry(confirmPassword, 'PASSWORD_MATCH', (val) => val === password);
    return true
  } catch (e) {
    errorHandler(errorMessages[e.message]);
    return false
  }

}