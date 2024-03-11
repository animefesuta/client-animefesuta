import { FC } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useUserStore } from "@/store/userStore";

interface LoginInProps {
  openDialog: (open: boolean) => void;
}

const formSchema = z.object({
  useremail: z.string().email({ message: "请输入正确的邮箱地址." }),
  password: z.string().min(8, {
    message: "密码需要至少 8 个字符.",
  }),
});

const LogIn: FC<LoginInProps> = ({ openDialog }) => {
  const { userLogin } = useUserStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      useremail: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    userLogin(values).then((res) => {
      if (res === true) {
        openDialog(false);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="useremail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input placeholder="输入邮箱..." {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              openDialog(false);
            }}
          >
            关闭
          </Button>
          <Button type="submit">登录</Button>
        </div>
      </form>
    </Form>
  );
};

export { LogIn };
