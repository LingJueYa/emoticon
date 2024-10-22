"use client";
// 用户输入组件
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { userInputSchema, UserInputType } from "@/schemas/userInput";
import axios from "axios";

interface UserInputProps {
  onEmojiResponse: (data: EmojiResponse | null) => void;
}

interface EmojiResponse {
  emoticon_one: string;
  emoticon_two: string;
  emoticon_three: string;
  emoticon_four: string;
  sentence: string;
}

const UserInput = ({ onEmojiResponse }: UserInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputType>({
    resolver: zodResolver(userInputSchema),
  });

  const onSubmit = async (data: UserInputType) => {
    setIsLoading(true);
    try {
      const response = await axios.post<EmojiResponse>("/api/dify-ai", {
        emojiDescription: data.emojiDescription,
      });
      //   console.log("API 响应:", response.data);
      onEmojiResponse(response.data);
    } catch (error) {
      console.error("API 请求错误:", error);
      onEmojiResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center space-x-3 w-full h-[65px] mb-6 rounded-lg"
    >
      <Input
        type="text"
        placeholder="描述您想要的颜文字"
        {...register("emojiDescription")}
        className="flex-grow h-full bg-white/90 rounded-lg px-5 py-2 text-lg focus:outline-none placeholder:text-gray-500  dark:bg-[#171717] dark:placeholder:text-white/60 dark:text-white/70"
      />
      {errors.emojiDescription && (
        <span className="text-red-500 text-sm absolute -bottom-6 left-0">
          {errors.emojiDescription.message}
        </span>
      )}
      <Button
        type="submit"
        variant="outline"
        size="icon"
        disabled={isLoading}
        className="w-[60px] h-full rounded-lgdark:bg-[#171717]"
      >
        {isLoading ? (
          <span className="animate-spin text-2xl">⏳</span>
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
};

export default UserInput;
