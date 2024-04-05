import axios from "@/plugins/axios";
import { Comment, Ranking, SendComment, forumPost } from "./types";

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

const getPost = async (id: string): Promise<forumPost> => {
  const res = await axios.get("/api/v1/fesuta/forum/getPostById", {
    params: {
      id: id,
    },
  });
  return res.data.data;
};

const sendCommentWithId = async (comment: SendComment): Promise<boolean> => {
  return (await axios.post("/api/v1/fesuta/forum/sendComment", comment)).data
    .data;
};

const getComments = async (postId: string): Promise<Comment[]> => {
  return await axios
    .get("/api/v1/fesuta/forum/getComments", {
      params: {
        id: postId,
      },
    })
    .then((res) => res.data.data);
};

const likeCount = async (postId: string): Promise<boolean> => {
  return await axios
    .get("/api/v1/fesuta/forum/likeCount", {
      params: {
        id: postId,
      },
    })
    .then((res) => res.data.data);
};

const shareCount = async (postId: string): Promise<boolean> => {
  return await axios
    .get("/api/v1/fesuta/forum/shareCount", {
      params: {
        id: postId,
      },
    })
    .then((res) => res.data.data);
};

export {
  createPost,
  getPostsByTheme,
  getRecommendPosts,
  getRanking,
  getPost,
  sendCommentWithId,
  getComments,
  likeCount,
  shareCount,
};
