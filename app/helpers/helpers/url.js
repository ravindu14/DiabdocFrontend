import { entries } from "../kernel/iterators";

/**
 *
 * @param {object} obj
 * @param {string} prefix
 * @return {string}
 */
export const serialize = (obj, prefix) => {
  var str = [];
  for (let [param, value] of entries(obj)) {
    let key = prefix ? `${prefix}[${param}]` : param;

    if (value !== null && typeof value === "object") {
      str.push(serialize(value, key));
      continue;
    }

    str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }
  return str.join("&");
};

/**
 *
 * @param {string} name
 * @param {string} url
 * @return {*}
 */
export const getParameterByName = (name, url) => {
  if (!name || !url) {
    return null;
  }

  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);

  name = name.replace(/[[\]]/g, "\\$&");

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

/**
 *
 * @param {string} url
 * @return {*}
 */
export const getLastSegment = (url) => {
  let segments = url.split("/");
  return segments.pop() || segments.pop();
};
