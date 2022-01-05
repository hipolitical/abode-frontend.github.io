
function getCurrentUserId() {
  return localStorage.getItem('userId');
}

function getCurrentUserType() {
  return localStorage.getItem('userType');
}

export {
  getCurrentUserId,
  getCurrentUserType,
}