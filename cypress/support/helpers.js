import jwt from 'jsonwebtoken'

export function makeLoginToken() {
  const loginUser = {
    username: 'admin',
    password: 'pass',
  }
  return jwt.sign(loginUser, 'test-secret', {
    subject: 'test-username',
    expiresIn: '2m',
    algorithm: 'HS256',
  })
}
