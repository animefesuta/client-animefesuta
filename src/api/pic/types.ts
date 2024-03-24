type PicForm = {
  files: { id: string; url: string }[];
  title: string;
  theme: string;
  tags?: string;
  coser?: string;
};

type Authors = {
  avatar: string;
  uid: string;
  username: string;
};

type PostPics = {
  coser: string[];
  createTime: string;
  creator: string;
  deleted: boolean;
  id: string;
  image: string[];
  status: boolean;
  status_desc: string;
  tags: string[];
  theme: string;
  title: string;
  updateTime: string;
  updater: string;
};

type BannerPics = Pick<PostPics, "id" | "image">;

export type { PicForm, Authors, PostPics, BannerPics };
