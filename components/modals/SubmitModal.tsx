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

const SubmitModal = ({
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

  return (
    <Dialog open={open}>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 mb-2">
              <CircleAlert className="text-primary" />
              {t(title)}
            </DialogTitle>
            <DialogDescription>{t(dscription)}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            <DialogClose asChild onClick={() => setOpen(false)}>
              <Button variant="outline" data-testid="submit-modal-cancel">
                {t(cancelButtonText)}
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={onSubmit}
              data-testid="submit-modal-ok"
            >
              {t(okButtonText)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SubmitModal;
