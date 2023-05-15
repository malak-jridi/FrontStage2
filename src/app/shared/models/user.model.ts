export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  country?: string;
  language?: string;
  description?: string;
  image?: string;
  video?: string;
  rate?: string;
  role: string;
}