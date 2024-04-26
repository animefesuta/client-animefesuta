import axios from "@/plugins/axios";
import { PicForm, PostPics } from "../pic/types";
import { SendComment } from "../post/types";

const postAiPic = async (data: PicForm) => {
  const res = await axios.post("/api/v1/fesuta/ai/postpic", {
    image: data.files.map((f) => f.url),
    title: data.title,
    theme: data.theme,
    tags: Array.from(data.tags?.split("#") ?? []),
    coser: Array.from(data.coser?.split(",") ?? []),
  });
  if (res.data) {
    return res.data;
  }
};

const getAiPosts = async (): Promise<PostPics[]> => {
  const res = await axios.get("/api/v1/fesuta/ai/getAiPosts");
  if (res.data.code === 200) {
    return res.data.data;
  }
  return [];
};

const getCos = async (id: string): Promise<PostPics> => {
  const res = await axios.get("/api/v1/fesuta/ai/getCosById", {
    params: {
      id: id,
    },
  });
  return res.data.data;
};

const sendCommentWithId = async (comment: SendComment): Promise<boolean> => {
  return (await axios.post("/api/v1/fesuta/ai/sendComment", comment)).data.data;
};

const getComments = async (cosId: string): Promise<Comment[]> => {
  return await axios
    .get("/api/v1/fesuta/ai/getComments", {
      params: {
        id: cosId,
      },
    })
    .then((res) => res.data.data);
};

const likeCount = async (cosId: string): Promise<boolean> => {
  return await axios
    .get("/api/v1/fesuta/ai/likeCount", {
      params: {
        id: cosId,
      },
    })
    .then((res) => res.data.data);
};

const shareCount = async (cosId: string): Promise<boolean> => {
  return await axios
    .get("/api/v1/fesuta/ai/shareCount", {
      params: {
        id: cosId,
      },
    })
    .then((res) => res.data.data);
};

const removeAiPic = async (cosId: string): Promise<boolean> => {
  return await axios
    .get("/api/v1/fesuta/ai/remove", {
      params: {
        id: cosId,
      },
    })
    .then((res) => res.data);
};

export {
  getAiPosts,
  postAiPic,
  getCos,
  sendCommentWithId,
  getComments,
  likeCount,
  shareCount,
  removeAiPic,
};
