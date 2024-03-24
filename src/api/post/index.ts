import axios from "@/plugins/axios";
import { forumPost } from "./types";

const createPost = async (
  data: Pick<forumPost, "title" | "theme" | "content">
): Promise<forumPost> => {
  const res = await axios.post("/api/v1/fesuta/forum/createpost", data);
  return res.data.data;
};

export { createPost };
