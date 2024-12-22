export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  forms: string[];
  profilePicture?: string;
}
