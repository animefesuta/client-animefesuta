type LiveStream = {
  id: string;
  key: string;
};

type CreateLive = {
  title: string;
  cover: string;
  category: string;
};

type LiveRoom = {
  cover: string;
  title: string;
  creator: string;
  key: string;
};

export type { LiveStream, CreateLive, LiveRoom };
