const calculateAge = (birthday) => {
  const birthDate = new Date(birthday); // birthday is a string in format YYYYMMDD
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const randomNumber = (minimum, maximum) =>
  Math.round(Math.random() * (maximum - minimum) + minimum);

const createCreditCardInfo = (birth) => {
  const creditCardNumber = `${randomNumber(0000, 9999)}-${randomNumber(
    0000,
    9999
  )}-${randomNumber(0000, 9999)}-${randomNumber(0000, 9999)}`;
  const expirationDate = `${randomNumber(01, 12)}/${randomNumber(21, 35)}`;
  const securityCode = `${randomNumber(000, 999)}`;

  let type = calculateAge(birth) > 45 ? 'Gold' : 'Classic';
  return { creditCardNumber, expirationDate, securityCode, type };
};

module.exports = { calculateAge, randomNumber, createCreditCardInfo };
