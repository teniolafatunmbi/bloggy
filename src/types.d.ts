
export type Article = {
    userId: number
    id: number
    title: string
    body: string
    user?: User
}


export type User = {
  id: number
  name: string
  email: string
  phone: string
}