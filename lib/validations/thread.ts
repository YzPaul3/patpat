import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z.string().min(3, { message: "至少 3 个字符" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().min(3, { message: "至少 3 个字符" }),
});
