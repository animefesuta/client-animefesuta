import axios from "@/plugins/axios";
import { Ranking, forumPost } from "./types";

const createPost = async (
  data: Pick<forumPost, "title" | "theme" | "content" | "img">
): Promise<forumPost> => {
  const res = await axios.post("/api/v1/fesuta/forum/createpost", data);
  return res.data.data;
};

const getPostsByTheme = async (theme: string): Promise<forumPost[]> => {
  const res = await axios.get("/api/v1/fesuta/forum/getPostsByTheme", {
    params: {
      theme: theme,
    },
  });
  return res.data.data;
};

const getRecommendPosts = async (): Promise<forumPost[]> => {
  const res = await axios.get("/api/v1/fesuta/forum/getPostsRecommend");
  return res.data.data;
};

const getRanking = async (): Promise<Ranking[]> => {
  const res = await axios.get("/api/v1/fesuta/forum/getRanking");
  return res.data.data;
};

export { createPost, getPostsByTheme, getRecommendPosts, getRanking };
