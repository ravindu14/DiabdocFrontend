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
      return "132.75 Calories";
    case "Hoppers":
      return "19.8 Calories";
    case "Noodles":
      return "207 Calories";
    case "Pizza":
      return "532 Calories";
    case "Rice":
      return "260 Calories";
    case "Rolls":
      return "221.6 Calories";
    case "Rottie":
      return "120 Calories";
    case "Samosa":
      return "100 Calories";
    default:
      return "220 Calories";
  }
};
