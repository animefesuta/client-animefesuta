import axios from "@/plugins/axios";
import { PicForm, PostPics } from "../pic/types";

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

export { getAiPosts, postAiPic };
