import axios from "@/plugins/axios";
import { Authors, PicForm, PostPics } from "./types";
import { ImageProps } from "@/components/cards/types";
import { SendComment } from "../post/types";

const imageupload = async (data: FileList): Promise<ImageProps[]> => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "/api/v1/fesuta/image/imageupload",
        {
          file: data,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const postpic = async (data: PicForm) => {
  const res = await axios.post("/api/v1/fesuta/cos/postpic", {
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

const getAllAuthors = async (): Promise<Authors[]> => {
  const res = await axios.get("/api/v1/fesuta/cos/getAllAuthors");
  if (res.data) {
    return res.data.data;
  }
  return [];
};

const getPicsByAuthorUID = async (uid: string): Promise<PostPics[]> => {
  const res = await axios.get("/api/v1/fesuta/cos/getPostByUID", {
    params: {
      UID: uid,
    },
  });
  if (res.data) {
    return res.data.data;
  }
  return [];
};

const getRecommendPosts = async (): Promise<PostPics[]> => {
  const res = await axios.get("/api/v1/fesuta/cos/getRecommendPosts");
  if (res.data.code === 200) {
    return res.data.data;
  }
  return [];
};

const getBanner = async (): Promise<PostPics[]> => {
  const res = await axios.get("/api/v1/fesuta/cos/getBanner");
  if (res.data.code === 200) {
    return res.data.data;
  }
  return [];
};

const getCos = async (id: string): Promise<PostPics> => {
  const res = await axios.get("/api/v1/fesuta/cos/getCosById", {
    params: {
      id: id,
    },
  });
  return res.data.data;
};

const sendCommentWithId = async (comment: SendComment): Promise<boolean> => {
  return (await axios.post("/api/v1/fesuta/cos/sendComment", comment)).data
    .data;
};

const getComments = async (cosId: string): Promise<Comment[]> => {
  return await axios
    .get("/api/v1/fesuta/cos/getComments", {
      params: {
        id: cosId,
      },
    })
    .then((res) => res.data.data);
};

const likeCount = async (cosId: string): Promise<boolean> => {
  return await axios
    .get("/api/v1/fesuta/cos/likeCount", {
      params: {
        id: cosId,
      },
    })
    .then((res) => res.data.data);
};

const shareCount = async (cosId: string): Promise<boolean> => {
  return await axios
    .get("/api/v1/fesuta/cos/shareCount", {
      params: {
        id: cosId,
      },
    })
    .then((res) => res.data.data);
};

export {
  imageupload,
  postpic,
  getPicsByAuthorUID,
  getAllAuthors,
  getRecommendPosts,
  getBanner,
  getCos,
  sendCommentWithId,
  getComments,
  likeCount,
  shareCount,
};
