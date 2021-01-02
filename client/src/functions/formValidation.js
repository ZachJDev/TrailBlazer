const errorMessages = {
  PARK_NAME: "Park Name is Too Short",
  PARK_DESC: "Park Description is Too Short",
  PARK_ADDRESS: "Park Address is Too Short",
  PARK_CITY: "Park City is too short",
  PARK_ST: "States must be two letters",
  PARK_ZIP: "Zip codes must be five digits",
  PARK_COUNTRY: "Country is too short",
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
    validateFormEntry(newParkState, "PARK_ST", (e) => e.length === 2);
    validateFormEntry(newParkZipCode, "PARK_ZIP", (e) => e.length === 5);
    return true;
  } catch (e) {
    errorHandler(errorMessages[e.message]);
    return false;
  }
};


