const calculateAge = (birthday) => {
  const birthDate = new Date(birthday); // birthday is a string in format YYYYMMDD
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const isClientsAgeInRange = (birth) =>
  !!(calculateAge(birth) >= 18 && calculateAge(birth) <= 65);

module.exports = { calculateAge, isClientsAgeInRange };
