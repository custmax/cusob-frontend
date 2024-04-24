export type LocalUser = {
  firstName?: string,
  lastName?: string,
  email?: string,
  avatar?: string,
  id?: number,
}

export const getToken = () => {


  const itemStr = localStorage.getItem('token');
  if (!itemStr) {
    return ''; // 如果数据不存在，直接返回 null
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem('token'); // 如果数据已过期，则删除数据并返回 null
    return '';
  }
  return item.value; // 如果数据未过期，则返回数据值
};

export const setAcceptFalse=(isAccept: string)=>{
  window.localStorage.setItem("Accept",'false')
}

export const getAccept=()=>{
  return  window.localStorage.getItem("Accept")
}

export const setToken = (token: string) => {
  const now = new Date();
  const item = {
    value: token || '',
    expiry: now.getTime() + 3600 * 1000*2 // 过期时间为当前时间加上 2h
  };
  window.localStorage.setItem('token', JSON.stringify(item))
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