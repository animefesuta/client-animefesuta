import axios from "axios";
import { LiveStream } from "./types";

const createLiveStream = (): Promise<LiveStream> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_NODE_ENDPOINT}/livestream/create`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject({
          code: 500,
          message: err,
        });
      });
  });
};

const getLatestPlaybackId = (): Promise<{ id: string }> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_NODE_ENDPOINT}/livestream/latest`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject({
          code: 500,
          message: err,
        });
      });
  });
};

export { createLiveStream, getLatestPlaybackId };
