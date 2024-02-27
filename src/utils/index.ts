interface ICookieType {
  [key: string]: string;
}

const getCookie = (name: string) => {
  let cookie: ICookieType = {};
  document.cookie.split(";").forEach(function (el) {
    let split = el.split("=");
    cookie[split[0].trim()] = split.slice(1).join("=");
  });
  return cookie[name];
};

export { getCookie };
