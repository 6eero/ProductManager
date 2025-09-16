import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";

const DetailCopy = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useTranslations("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        setCopied(true);
        setOpen(true);
        setTimeout(() => {
          setCopied(false);
          setOpen(false);
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <span className="flex gap-2 items-center select-none">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Copy
            onClick={handleCopy}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            strokeWidth={1.9}
            size={14}
            className="text-primary cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent className="w-max p-1 text-sm text-gray-500">
          {copied ? t("generic.copy_done") : t("generic.copy")}
        </PopoverContent>
      </Popover>
      {id}
    </span>
  );
};

export default DetailCopy;
