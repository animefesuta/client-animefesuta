import axios from "@/plugins/axios";
import { CreateLive, LiveRoom, LiveStream } from "./types";

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
const getLatestPlaybackId = (): Promise<{ data: string }> => {
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

const getRoomByUID = (uid: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${import.meta.env.VITE_NODE_ENDPOINT}/livestream/getRoomStream/${uid}`
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

const getAllLivingRoom = async (): Promise<LiveRoom[]> => {
  return await axios
    .get("/api/v1/fesuta/live/getAllLivingRoom")
    .then((res) => res.data.data);
};
export {
  createLiveStream,
  getLatestPlaybackId,
  getLiveRoom,
  updateLiveRoom,
  closeLiveRoom,
  getRoomByUID,
  getAllLivingRoom,
};
