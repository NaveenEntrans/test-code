import jwt from 'jwt-decode'
export const generatePassword = (length: number) => {
  let password = ''
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return password
}

export const Token = () => {
  const data = localStorage.getItem('jwtToken')
  return data
}
