type LiveStream = {
  id: string;
  key: string;
};

type CreateLive = {
  title: string;
  cover: string;
  category: string;
};

export type { LiveStream, CreateLive };
