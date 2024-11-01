"use client";
// 颜表情显示组件

import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmojiDisplayProps {
  emoticon_one: string;
  emoticon_two: string;
  emoticon_three: string;
  emoticon_four: string;
  sentence: string;
}

const EmojiDisplay = ({
  emoticon_one,
  emoticon_two,
  emoticon_three,
  emoticon_four,
  sentence,
}: EmojiDisplayProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `" ${text} " 复制成功啦！`,
    });
  };

  const renderEmojiBlock = (emoji: string) => (
    <div className="
      relative 
      p-8 
      bg-white/85 
      backdrop-blur-md 
      rounded-2xl 
      shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
      min-h-[160px] 
      min-w-[280px] 
      flex 
      items-center 
      justify-center 
      border
      border-gray-50
      transition-all
      duration-300
      hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]
      hover:bg-white/90
      dark:bg-[#171717]/90
      dark:border-gray-800
      dark:hover:bg-[#171717]/95
    ">
      {emoji ? (
        <>
          <button
            onClick={() => copyToClipboard(emoji)}
            className="
              absolute 
              top-4 
              right-4 
              p-2 
              rounded-lg
              text-gray-400 
              hover:text-gray-600
              hover:bg-gray-50/50
              transition-colors
              duration-200
              dark:hover:bg-gray-800/50
              dark:hover:text-gray-300
            "
            aria-label="复制表情"
          >
            <Copy size={16} />
          </button>
          <p className="text-4xl text-center text-gray-800 dark:text-white/80">{emoji}</p>
        </>
      ) : (
        <p className="text-gray-600 text-xl dark:text-white/60">
          ⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {renderEmojiBlock(emoticon_one)}
        {renderEmojiBlock(emoticon_two)}
        {renderEmojiBlock(emoticon_three)}
        {renderEmojiBlock(emoticon_four)}
      </div>
      
      <div className="
        relative 
        p-6 
        bg-white/85 
        backdrop-blur-md 
        rounded-2xl 
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
        flex 
        items-center 
        min-h-[80px]
        border
        border-gray-50
        transition-all
        duration-300
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]
        hover:bg-white/90
        dark:bg-[#171717]/90
        dark:border-gray-800
        dark:hover:bg-[#171717]/95
      ">
        {sentence ? (
          <>
            <p className="flex-grow text-lg text-gray-700 leading-relaxed dark:text-white/80">
              {sentence}
            </p>
            <button
              onClick={() => copyToClipboard(sentence)}
              className="
                ml-6 
                p-2.5 
                rounded-lg
                text-gray-400 
                hover:text-gray-600
                hover:bg-gray-50/50
                transition-colors
                duration-200
                dark:hover:bg-gray-800/50
                dark:hover:text-gray-300
              "
              aria-label="复制句子"
            >
              <Copy size={16} />
            </button>
          </>
        ) : (
          <p className="text-gray-600 text-xl dark:text-white/60">
            ⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾ 就等您输入啦！
          </p>
        )}
      </div>
    </div>
  );
};

export default EmojiDisplay;
