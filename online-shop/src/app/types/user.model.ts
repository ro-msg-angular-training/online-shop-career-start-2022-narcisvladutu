export type Role = "customer" | "admin" | "user"

export interface User {
  "username": string,
  "fullName": string,
  "roles": Role[]
}
