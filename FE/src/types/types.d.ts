export interface IClubDetail {
  image_url: string;
  title: string;
  description: string;
  location: string;
  date: string;
  members_limit: number;
  club_members: IUser[];
  meta: IClubDetailMetaData;
}
export interface IClubDetailMetaData {
  posts: number;
  recent_date: number;
  meeting_count: number;
}
export interface IUser {
  _id: string;
  image_url: string;
  username: string;
  nickname: string;
  location?: string;
}
export interface IUserResponse {
  data: IUser[];
}
export interface IPost {
  title: string;
  payload: string;
  image_url: string[];
  category: 'free' | 'notice' | 'recommend' | 'greet';
  user: IUser;
}
export interface IBook {
  id: string;
  image_url: string;
  title: string;
  author: string;
  publisher: string;
  description: string;
  date: string;
  published_year: string;
}
