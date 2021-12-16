
function getCurrentUserId() {
  return localStorage.getItem('userId');
}

export {
  getCurrentUserId,
}