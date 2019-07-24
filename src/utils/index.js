const CITY_KEYS = 'hkzf_city'
export const getCityCurrent = () => {
  return JSON.parse(localStorage.getItem(CITY_KEYS))
}

export const setCityCurrent = valueObj => {
  return localStorage.setItem(CITY_KEYS, JSON.stringify(valueObj))
}
