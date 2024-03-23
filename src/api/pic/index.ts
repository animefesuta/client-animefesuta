import axios from "@/plugins/axios";
import { PicForm } from "./types";
import { ImageProps } from "@/components/cards/types";

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

const getPicsByAuthorUID = async (uid: string) => {
  const res = await axios.get("/api/v1/fesuta/cos/getPostByUID", {
    params: {
      UID: uid,
    },
  });
  if (res.data) {
    return res.data;
  }
};

export { imageupload, postpic, getPicsByAuthorUID };
