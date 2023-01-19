import { redirect } from "react-router-dom";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export async function requireUserSession( navToken ) {
  const token = window.localStorage.getItem("token");

  if (navToken) {
    console.log(navToken)
    return null;
  }

  if (!token) {
    throw redirect("/login", 302);
  }

  const { userId } = parseJwt(token);

  return userId;
}
