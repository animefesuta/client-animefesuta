import axios from "@/plugins/axios";
import { CreateLive, LiveStream } from "./types";

const createLiveStream = (createlive: CreateLive): Promise<LiveStream> => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_NODE_ENDPOINT}/livestream/create`,
        createlive
      )
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject({
          code: 500,
          message: err,
        });
      });
  });
};

const getLiveRoom = (): Promise<LiveStream & CreateLive> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_NODE_ENDPOINT}/livestream/getLiveRoom`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject({
          code: 500,
          message: err,
        });
      });
  });
};

const updateLiveRoom = (
  updateData: CreateLive
): Promise<LiveStream & CreateLive> => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_NODE_ENDPOINT}/livestream/update`,
        updateData
      )
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject({
          code: 500,
          message: err,
        });
      });
  });
};
const closeLiveRoom = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_NODE_ENDPOINT}/livestream/close`)
      .then((res) => {
        resolve(res.data.data);
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

export {
  createLiveStream,
  getLatestPlaybackId,
  getLiveRoom,
  updateLiveRoom,
  closeLiveRoom,
};
