import { CardContent, Card } from "@/components/ui/card";
import { SVGProps, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import * as React from "react";
import { IoCloseCircle } from "react-icons/io5";
import clsx from "clsx";
import { imageupload } from "@/api/pic";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";

export interface UploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  lookImageChange: (fileList: { id: string; url: string }[]) => void;
}

const ImageUpload = React.forwardRef<HTMLInputElement, UploadProps>(
  ({ className, type, lookImageChange, ...props }, ref) => {
    const [fileList, setFileList] = useState<{ id: string; url: string }[]>([]);
    useEffect(() => {
      lookImageChange(fileList);
    }, [fileList, lookImageChange]);

    const { toast } = useToast();
    const { userLogout } = useUserStore();
    const navigate = useNavigate();
    const getImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;
      await imageupload(files)
        .then((data) => {
          setFileList(() => [
            ...fileList,
            ...data.map((f) => ({ id: f.id, url: f.filePath })),
          ]);
        })
        .catch((err) => {
          if (err === 401) {
            toast({
              description: "登录失效，请重新登录。",
            });
            userLogout();
            navigate("/");
          }
        });
    };

    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
          {(fileList.length && (
            <div
              className={clsx(
                fileList.length > 2
                  ? "grid-cols-3"
                  : fileList.length > 1
                  ? "grid-cols-2"
                  : "grid-cols-1",
                "grid gap-3"
              )}
            >
              {fileList.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={
                      import.meta.env.VITE_MINIO_ENDPOINT + "/images" + file.url
                    }
                    width={180}
                    alt={file.url}
                    className="rounded-lg"
                  />
                  <button
                    onClick={() =>
                      setFileList((prev) => prev.filter((f) => f !== file))
                    }
                    className="flex justify-center items-center absolute top-[-10px] right-[-10px] cursor-pointer"
                  >
                    <IoCloseCircle size={24} />
                  </button>
                </div>
              ))}
            </div>
          )) || <UploadCloudIcon />}
          <div>
            <label
              htmlFor="image_uploads"
              className="cursor-pointer text-sm bg-black text-white px-4 py-2 rounded-sm"
            >
              上传
            </label>
            <input
              type={type}
              className={className}
              ref={ref}
              {...props}
              id="image_uploads"
              name="image_uploads"
              onChange={(e) => getImages(e)}
              multiple
              accept="image/*"
            />
          </div>
        </CardContent>
      </Card>
    );
  }
);
function UploadCloudIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

ImageUpload.displayName = "ImageUpload";

export { ImageUpload };
