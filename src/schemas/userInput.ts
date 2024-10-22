// [schemas] 用户输入内容验证

import { z } from "zod";

export const userInputSchema = z.object({
  emojiDescription: z.string().min(1, "输入内容不能为空哦～").max(50, "输入内容不能超过50个字符哦～"),
});

export type UserInputType = z.infer<typeof userInputSchema>;