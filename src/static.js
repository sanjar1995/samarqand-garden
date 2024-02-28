export const baseUrl = "https://card-delivery.herokuapp.com/";
export const limit = 8;

let lang = localStorage.getItem("user-locale")
  ? localStorage.getItem("user-locale")
  : "ru";

export const headers_def = {
  accept: "application/json",
};
export const headers_def_two = {
  accept: "application/json",
  "Content-Type": "application/json",
};
export const headers_one = {
  accept: "application/json",
  "accept-language": `${lang}-${lang.toUpperCase()}`,
};
export const headers_adm = {
  accept: "application/json",
  "accept-language": `all-ALL`,
};
export const headers_two = {
  accept: "application/json",
  "Content-Type": "multipart/form-data",
  "accept-language": `${lang}-${lang.toUpperCase()}`,
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};
export const headers_three = {
  accept: "*/*",
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

export const headers_five = {
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};
