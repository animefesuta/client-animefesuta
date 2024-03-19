import axios from "@/plugins/axios";
import { PicForm } from "./types";

const imageupload = async (data: FileList) => {
  const res = await axios.post(
    "/api/v1/fesuta/image/imageupload",
    {
      file: data,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (res.data) {
    return res.data.data;
  }
};

const postpic = async (data: PicForm) => {
  const res = await axios.post("/api/v1/fesuta/cos/postpic", {
    image: data.files,
    title: data.title,
    theme: data.theme,
    tags: Array.from(data.tags?.split("#") ?? []),
    coser: Array.from(data.coser?.split(",") ?? []),
  });
  if (res.data) {
    return res.data;
  }
};

export { imageupload, postpic };
