type ImageProps = {
  createTime: string;
  creator: string;
  deleted: string;
  fileHash: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  id: string;
  imageCategory: string | null;
  imageCopyrightInformation: string | null;
  imageCountCollection: string | null;
  imageCountComments: string | null;
  imageCountDownload: string | null;
  imageCountLikes: string | null;
  imageDescription: string | null;
  imageKeywords: string | null;
  imageVisibility: string | null;
  originalFileName: string;
  updateTime: string | null;
  updater: string | null;
};

export type { ImageProps };
