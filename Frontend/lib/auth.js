const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export function saveTokens({ access, refresh, username }) {
  sessionStorage.setItem("aa_access", access);
  sessionStorage.setItem("aa_refresh", refresh);
  sessionStorage.setItem("aa_username", username);
  document.cookie = "aa_logged_in=1; path=/; SameSite=Strict";
}

export function getAccessToken() {
  return sessionStorage.getItem("aa_access");
}

export function clearTokens() {
  sessionStorage.removeItem("aa_access");
  sessionStorage.removeItem("aa_refresh");
  sessionStorage.removeItem("aa_username");
  document.cookie = "aa_logged_in=; path=/; max-age=0; SameSite=Strict";
}

export function getUsername() {
  return sessionStorage.getItem("aa_username") || "";
}

export async function loginRequest(username, password) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed.");
  return data;
}

export async function verifyToken() {
  const token = getAccessToken();
  if (!token) return false;
  const res = await fetch(`${API_BASE}/auth/verify/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) { clearTokens(); return false; }
  return true;
}

export function authHeaders() {
  const token = getAccessToken();
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export function logout(router) {
  clearTokens();
  router.push("/admin");
}