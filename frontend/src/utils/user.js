export function getOrCreateUserId() {
  let id = localStorage.getItem("userId");
  if (!id) {
    id = "user_" + Math.random().toString(36).substring(2, 9);
    localStorage.setItem("userId", id);
  }
  return id;
}
