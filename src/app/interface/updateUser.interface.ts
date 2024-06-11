export interface UpdateUserInterface {
  direction: string;
  zipcode: number;
  town: string;
  username: string;
  email: string;
  password: string|null;
  isDeleted: boolean;
}