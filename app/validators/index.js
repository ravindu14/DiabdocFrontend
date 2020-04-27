export const PATTERN_NAME = /[a-z ,.'-]+/;
export const PATTERN_WIGHT = /\d{1,3}/;
export const PATTERN_DOB = /\d{4}\-\d{1,2}\-\d{1,2}/;
export const PATTERN_EMAIL = /\S+@\S+\.\S+/;
export const PATTERN_PASSWORD = /[a-z0-9]{8,}/;
export const PATTERN_FULLNAME = /^$|^[a-zA-ZčČćĆđĐšŠžŽ-]+ [a-zA-ZčČćĆđĐšŠžŽ-]+$/;
export const PATTERN_NUMBER = /^-?\d*(\.\d+)?$/;

export const NameValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_NAME, value);
};

export const WeightValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_WIGHT, value);
};

export const DOBValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_DOB, value);
};

export const EmailValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_EMAIL, value);
};

export const PasswordValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_PASSWORD, value);
};

export const PhoneNumberValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_PHONE, value);
};

export const StringValidator = (value: string): boolean => {
  return !!value && value.length > 0;
};

export const NumberValidator = (value: string): boolean => {
  return RegExpValidator(PATTERN_NUMBER, value);
};

const RegExpValidator = (regexp, value: string): boolean => {
  return regexp.test(value);
};
