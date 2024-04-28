import { useEffect, useState } from "react";
import { Payment, PostTable } from "./PicTable";
import { getAllCoses, getAICoses, removePic } from "@/api/pic";
import { removeAiPic } from "@/api/ai";

const PicsManage: React.FC = () => {
  const [pm1, setPm1] = useState<Payment[]>([]);
  const [pm2, setPm2] = useState<Payment[]>([]);

  useEffect(() => {
    getAllCoses().then((res) => {
      setPm1(res as unknown as Payment[]);
    });
    getAICoses().then((res) => {
      setPm2(res as unknown as Payment[]);
    });
  }, []);

  const deletec = (id: string) => {
    removePic(id).then(() => {
      getAllCoses().then((res) => {
        setPm1(res as unknown as Payment[]);
      });
    });
  };
  const deleteai = (id: string) => {
    removeAiPic(id).then(() => {
      getAICoses().then((res) => {
        setPm2(res as unknown as Payment[]);
      });
    });
  };

  const preViewPicAi = (id: string) => {
    window.open("aipic/" + id);
  };
  const preViewPicAic = (id: string) => {
    window.open("picback/" + id);
  };

  return (
    <div className="px-3 py-3">
      <PostTable
        preViewPicAi={preViewPicAi}
        preViewPicAic={preViewPicAic}
        deleteai={deleteai}
        deletec={deletec}
        ai={false}
        data={pm1!}
      />
      <hr />
      <h2>AI生成图</h2>
      <hr />
      <PostTable
        preViewPicAi={preViewPicAi}
        preViewPicAic={preViewPicAic}
        deleteai={deleteai}
        deletec={deletec}
        ai={true}
        data={pm2!}
      />
    </div>
  );
};

export { PicsManage };
