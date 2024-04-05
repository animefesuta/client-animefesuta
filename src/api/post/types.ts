import { Base } from "../common";

interface forumPost extends Base {
  content: string;
  createTime: string;
  creator: string;
  deleted: string;
  id: string;
  theme: string;
  title: string;
  updateTime: string;
  updater: string;
  clickCount: string;
  likeCount: string;
  shareCount: string;
  status: boolean;
  status_desc: string;
  recommend: boolean;
  nickname: string;
  img: string;
}

type Ranking = Pick<forumPost, "id" | "title">;

type Comment = {
  commentContext: string;
  commentLike: string;
  commentUser: string;
  commentUserNickName: string;
  createTime: string;
  creator: string;
  deleted: boolean;
  id: string;
  parentID: string;
  themeID: string;
  typeID: string;
  updateTime: string;
  updater: string;
  user_image: string;
};
type SendComment = {
  commentContext: string;
  themeID: string;
};

export type { forumPost, Ranking, SendComment, Comment };
