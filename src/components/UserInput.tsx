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
      className="flex items-center gap-4 w-full h-[64px] mb-8 relative"
    >
      <Input
        type="text"
        placeholder="告诉我您的心情，我将为您定制专属的颜文字和文案。"
        {...register("emojiDescription")}
        className="
          flex-grow 
          h-full 
          bg-white/90 
          backdrop-blur-md 
          rounded-2xl 
          px-6
          text-[15px] 
          border 
          border-gray-100/30
          shadow-[0_2px_8px_rgba(0,0,0,0.04)]
          focus:outline-none 
          focus:ring-1 
          focus:ring-gray-100/50 
          focus:border-gray-200/50
          focus:bg-white/95
          placeholder:text-gray-400/90
          dark:bg-[#1a1a1a]/85 
          dark:border-gray-800/40
          dark:focus:ring-gray-700/30 
          dark:focus:border-gray-700/50
          dark:placeholder:text-gray-500 
          dark:text-white/90
          transition-all 
          duration-300
        "
      />
      {errors.emojiDescription && (
        <span className="text-red-500/90 text-[13px] absolute -bottom-6 left-2">
          {errors.emojiDescription.message}
        </span>
      )}
      <Button
        type="submit"
        variant="outline"
        size="icon"
        disabled={isLoading}
        className="
          w-[64px] 
          h-full 
          rounded-2xl 
          bg-white/90 
          backdrop-blur-md
          border 
          border-gray-100/30 
          shadow-[0_2px_8px_rgba(0,0,0,0.04)]
          hover:bg-orange-50/50 
          dark:bg-[#1a1a1a]/85 
          dark:border-gray-800/40
          dark:hover:bg-gray-800/40 
          transition-all 
          duration-300
        "
      >
        {isLoading ? (
          <span className="animate-spin text-xl">⏳</span>
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500 dark:text-white/70" />
        )}
      </Button>
    </form>
  );
};

export default UserInput;
