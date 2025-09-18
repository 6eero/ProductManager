"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface CustomButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  onClick?: () => void;
  text?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ onClick, text, icon, loading = false, className, ...props }, ref) => {
    const t = useTranslations("");
    return (
      <Button
        ref={ref}
        onClick={onClick}
        className={cn("flex items-center gap-2", className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="animate-spin h-4 w-4" />}
        {!loading && icon && icon}
        {text && <span>{t(text)}</span>}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
