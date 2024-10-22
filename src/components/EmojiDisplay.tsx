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
      title: `“ ${text} ” 复制成功啦！`,
    });
  };

  const renderEmojiBlock = (emoji: string) => (
    <div className="relative p-6 bg-white/90 rounded-lg shadow-md min-h-[140px] min-w-[280px] flex items-center justify-center dark:bg-[#171717]">
      {emoji ? (
        <>
          <button
            onClick={() => copyToClipboard(emoji)}
            className="absolute top-3 right-3 text-gray-600 hover:text-white/60"
            aria-label="复制表情"
          >
            <Copy size={18} />
          </button>
          <p className="text-3xl text-center dark:text-white/60">{emoji}</p>
        </>
      ) : (
        <p className="text-black/90 text-xl dark:text-white/60">
          ⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6 mb-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {renderEmojiBlock(emoticon_one)}
        {renderEmojiBlock(emoticon_two)}
        {renderEmojiBlock(emoticon_three)}
        {renderEmojiBlock(emoticon_four)}
      </div>
      <div className="relative p-5 bg-white/90 rounded-lg shadow-md flex items-center min-h-[70px] dark:bg-[#171717]">
        {sentence ? (
          <>
            <p className="flex-grow text-lg dark:text-white/60">{sentence}</p>
            <button
              onClick={() => copyToClipboard(sentence)}
              className="ml-5 text-gray-500 hover:text-gray-700"
              aria-label="复制句子"
            >
              <Copy size={18} />
            </button>
          </>
        ) : (
          <p className="text-black/90 text-xl dark:text-white/60">
            ⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾
          </p>
        )}
      </div>
    </div>
  );
};

export default EmojiDisplay;
