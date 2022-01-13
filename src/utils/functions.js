
function getCurrentUserId() {
  return localStorage.getItem('userId');
}

function getCurrentUserType() {
  return localStorage.getItem('userType');
}

function isAdmin() {
  return getCurrentUserType() === 'admin'
}

export {
  getCurrentUserId,
  getCurrentUserType,
  isAdmin,
}