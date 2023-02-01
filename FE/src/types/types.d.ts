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
  image_url: string;
  username: string;
  nickname: string;
}
export interface IUserResponse {
  data: IUser[];
}
