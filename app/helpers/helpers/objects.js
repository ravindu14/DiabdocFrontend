export const removeEmptyKeys = (obj) => {
  Object.entries(obj).forEach(
    ([key, val]) =>
      (val && typeof val === "object" && removeEmptyKeys(val)) ||
      ((val === null || val === "" || val === undefined) && delete obj[key])
  );
  return obj;
};

export const getCalories = (item) => {
  switch (item) {
    case "Burger":
      return "2.95 Cal/g";
    case "Hoppers":
      return "1.65 Cal/g";
    case "Noodles":
      return "1.38 Cal/g";
    case "Pizza":
      return "2.66 Cal/g";
    case "Rice":
      return "1.30 Cal/g";
    case "Rolls":
      return "2.77 Cal/g";
    case "Rottie":
      return "1.20 Cal/g";
    case "Samosa":
      return "2.70 Cal/g";
    default:
      return "3.12 Cal/g";
  }
};
