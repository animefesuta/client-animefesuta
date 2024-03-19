import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PencilRuler } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageUpload } from "@/components/cards/ImageUpload";

const formSchema = z.object({
  file: z.array(z.any()).min(1, { message: "请选择至少一张图片." }),
  title: z.string().min(1, { message: "标题需要至少 1 个字符." }),
  theme: z.string().min(1, { message: "主题需要至少 1 个字符." }),
  tags: z.string(),
  coser: z.string(z.any()),
});
const PicsPost = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: [],
      title: "",
      theme: "",
      tags: "",
      coser: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function lookImageChange(e: File[]) {
    form.setValue("file", e);
  }
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="py-2 px-14 text-white rounded-md flex gap-2 items-center text-[24px] justify-center bg-sky-400 hover:bg-sky-300 cursor-pointer transition-all">
          <PencilRuler size={26} />
          <div>我要返图</div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="mx-3">返图</DrawerTitle>
          <DrawerDescription>
            <div className="mx-3">
              可以是某场漫展、某个Coser，也可以是指定分区.
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="my-5">
                <ScrollArea className="h-[60vh]">
                  <FormField
                    control={form.control}
                    name="file"
                    render={(field) => (
                      <FormItem className="mx-3 mb-2">
                        <FormControl>
                          <ImageUpload
                            className="hidden"
                            type="file"
                            lookImageChange={lookImageChange}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="mx-3 mb-2">
                        <FormLabel>标题</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="填写返图标题: 爱莉希雅..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem className="mx-3 mb-2">
                        <FormLabel>漫展主题</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="填写漫展主题: 32nd萤火虫..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem className="mx-3 mb-2">
                        <FormLabel>分类</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="填写分类: #萤火虫 #爱莉希雅 #..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coser"
                    render={({ field }) => (
                      <FormItem className="mx-3 mb-2">
                        <FormLabel>仅发送给</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="指定Coser: Coser1,Coser2"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
                <div className="flex space-x-4">
                  <Button type="submit">完成</Button>
                  <DrawerClose>
                    <Button variant="outline">取消</Button>
                  </DrawerClose>
                </div>
              </form>
            </Form>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
export default PicsPost;
