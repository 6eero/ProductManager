import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { CircleAlert } from "lucide-react";

const DangerModal = ({
  title,
  dscription,
  okButtonText,
  cancelButtonText,
  children,
  open,
  setOpen,
  onSubmit,
}: {
  title: string;
  dscription: string;
  okButtonText: string;
  cancelButtonText: string;
  children?: ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: () => void;
}) => {
  const t = useTranslations("");
  const handleSubmit = () => {
    onSubmit();
    setOpen(false);
  };
  return (
    <Dialog open={open}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 mb-2">
              <CircleAlert className="text-destructive" />
              {t(title)}
            </DialogTitle>
            <DialogDescription>{t(dscription)}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            <DialogClose asChild onClick={() => setOpen(false)}>
              <Button variant="outline">{t(cancelButtonText)}</Button>
            </DialogClose>
            <Button variant="destructive" type="submit" onClick={handleSubmit}>
              {t(okButtonText)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DangerModal;
