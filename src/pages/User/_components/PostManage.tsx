import { useEffect, useState } from "react";
import { Payment, PostTable } from "./PostTable";
import { deletePost, getAllPost } from "@/api/post";

const PostManage: React.FC = () => {
  const [pm, setPm] = useState<Payment[]>([]);
  useEffect(() => {
    getAllPost().then((res) => {
      setPm(res as unknown as Payment[]);
    });
  }, []);

  const deletec = (id: string) => {
    deletePost(id).then(() => {
      getAllPost().then((res) => {
        setPm(res as unknown as Payment[]);
      });
    });
  };
  const previewPost = (id: string) => {
    window.open("posts/" + id);
  };

  return (
    <div className="px-3 py-3">
      <PostTable previewPost={previewPost} deletePost={deletec} data={pm!} />
    </div>
  );
};

export { PostManage };
