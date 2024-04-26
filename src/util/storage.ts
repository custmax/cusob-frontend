
export type LocalUser = {
  firstName?: string,
  lastName?: string,
  email?: string,
  avatar?: string,
  id?: number,
}

export const getToken = () => {
  return window.localStorage.getItem('token' ) || ''; // 如果数据未过期，则返回数据值
};

export const setToken = (token: string) => {
  window.localStorage.setItem('token', token || '')
}

export const clearToken = () => {
  window.localStorage.removeItem('token')
}

export const getLocalUser = () => {
  const localUserStr = window.localStorage.getItem('localUser') || ''
  if (localUserStr) {
    const localUserObj = JSON.parse(localUserStr) as LocalUser;
    return localUserObj
  }
  return null
}

export const setLocalUser = (user: LocalUser) => {
  const localUser = getLocalUser() || {}
  const newLocalUser = { ...localUser, ...user }
  const newLocalUserStr = JSON.stringify(newLocalUser)
  window.localStorage.setItem('localUser', newLocalUserStr);
}

export const clearLocalUser = () => {
  window.localStorage.removeItem('localUser');
};