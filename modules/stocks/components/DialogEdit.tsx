import SubmitModal from "@/components/modals/SubmitModal";

const DialogEdit = ({
  open,
  setOpen,
  onSubmit,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: () => void;
}) => {
  return (
    <SubmitModal
      title={"stocks.modals.edit.title"}
      dscription={"stocks.modals.edit.description"}
      okButtonText={"stocks.modals.edit.ok"}
      cancelButtonText={"stocks.modals.edit.cancel"}
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit}
    >
      bbbb
    </SubmitModal>
  );
};

export default DialogEdit;
