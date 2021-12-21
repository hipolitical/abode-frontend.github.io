function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterBySearchKeyword(arr, searchKey) {
  if (Array.isArray(arr))
    return arr.filter(obj => Object.keys(obj).some(key => String(obj[key]).includes(searchKey)));
  return arr
}

export {
  capitalizeFirstLetter,
  filterBySearchKeyword,
}