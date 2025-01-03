import type { User } from './types'

export const mockUsersDatabase = [
  {
    id: '1',
    name: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    id: '2',
    name: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    password: 'password456',
  },
]

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsersDatabase.find(
        (user) => user.email === email && user.password === password
      )
      if (user) {
        resolve(user)
      } else {
        reject(new Error('Invalid email or password'))
      }
    }, 1000)
  })
}

export const register = async ({
  email,
  lastName,
  name,
  password,
}: Omit<User, 'id'>): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password,
        lastName,
      }
      mockUsersDatabase.push(newUser)
      resolve(newUser)
    }, 1000)
  })
}
