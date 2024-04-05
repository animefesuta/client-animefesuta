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

import { useToast } from "@/components/ui/use-toast";

interface LoginInProps {
  signType: number;
  openDialog: (open: boolean) => void;
}

const formSchema = z.object({
  signDesc: z.string().min(20, {
    message: "请输入申请理由并且不少于20个字符",
  }),
  phone: z.string().regex(/^1\d{10}$/, { message: "请输入正确的手机号码" }),
});

const UserSign: FC<LoginInProps> = ({ openDialog, signType }) => {
  const { signCoser, signMerchant } = useUserStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signDesc: "",
      phone: "",
    },
  });

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (signType === 0) {
      signMerchant(values).then(() => {
        openDialog(false);
        toast({
          description: "收到您的申请，请等待审核",
        });
      });
    } else {
      signCoser(values).then(() => {
        openDialog(false);
        toast({
          description: "收到您的申请，请等待审核",
        });
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>联系方式</FormLabel>
              <FormControl>
                <Input placeholder="输入联系方式..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="signDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>申请理由</FormLabel>
              <FormControl>
                <Input placeholder="输入申请理由..." {...field} />
              </FormControl>
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
          <Button type="submit">提交</Button>
        </div>
      </form>
    </Form>
  );
};

export { UserSign };
