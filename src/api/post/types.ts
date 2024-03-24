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
}

export type { forumPost };
