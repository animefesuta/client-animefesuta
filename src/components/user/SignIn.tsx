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

interface SignInProps {
  openDialog: (open: boolean) => void;
  openLogin: () => void;
}

const formSchema = z
  .object({
    username: z.string().min(1, { message: "用户名不能为空." }),
    useremail: z.string().email({ message: "请输入正确的邮箱地址." }),
    password: z.string().min(8, {
      message: "密码需要至少 8 个字符.",
    }),
    repassword: z.string().min(8, {
      message: "确认密码需要至少 8 个字符.",
    }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "两次输入的密码不一致",
    path: ["repassword"],
  });

const SignIn: FC<SignInProps> = ({ openDialog, openLogin }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      useremail: "",
      password: "",
      repassword: "",
    },
  });
  const { userSignin } = useUserStore();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    userSignin(values).then((res) => {
      if (res === true) {
        openDialog(false);
        openLogin();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input placeholder="输入用户名..." {...field} />
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
        <FormField
          control={form.control}
          name="repassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认密码</FormLabel>
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
          <Button type="submit">注册</Button>
        </div>
      </form>
    </Form>
  );
};

export { SignIn };
