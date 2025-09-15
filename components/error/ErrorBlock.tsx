import { Ban } from "lucide-react";

export const ErrorBlock = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center p-6 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive">
      <Ban size={64} className="text-destructive" />
      <p className="text-lg font-semibold">An error occured</p>
      <p className="text-sm text-muted-foreground max-w-md">{error}</p>
    </div>
  );
};
