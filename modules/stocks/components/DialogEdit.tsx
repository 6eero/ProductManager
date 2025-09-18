import FormikInput from "@/components/formik/Input";
import FormikSelect from "@/components/formik/Select";
import SubmitModal from "@/components/modals/SubmitModal";
import { Stock } from "@/models/stocks";
import { getCategories } from "@/models/stocks/constants";
import { Formik } from "formik";
import { useTranslations } from "next-intl";

const DialogEdit = ({
  open,
  setOpen,
  onSubmit,
  validationSchema,
  stock,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (values: any) => void;
  validationSchema: any;
  stock: Stock;
}) => {
  const t = useTranslations("");
  return (
    <Formik
      key={open ? "open" : "closed"}
      initialValues={{
        id: stock?.id || "",
        name: stock?.name || "",
        quantity: stock?.quantity || 0,
        category: stock?.category || undefined,
        price: stock?.price || 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        setOpen(false);
      }}
    >
      {(formik) => {
        return (
          <SubmitModal
            title={"stocks.modals.edit.title"}
            dscription={"stocks.modals.edit.description"}
            okButtonText={"stocks.modals.edit.ok"}
            cancelButtonText={"stocks.modals.edit.cancel"}
            open={open}
            setOpen={setOpen}
            onSubmit={() => {
              formik.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6 my-4">
              <FormikInput
                name="name"
                label={"stocks.modals.add.fields.name.label"}
                placeholder={"stocks.modals.add.fields.name.placeholder"}
                formik={formik}
                required
              />
              <FormikInput
                name="quantity"
                label={"stocks.modals.add.fields.quantity.label"}
                placeholder={"stocks.modals.add.fields.quantity.placeholder"}
                formik={formik}
                required
              />
              <FormikSelect
                name="category"
                label={"stocks.modals.add.fields.category.label"}
                placeholder={"stocks.modals.add.fields.category.placeholder"}
                formik={formik}
                required
                options={getCategories(t)}
              />
              <FormikInput
                name="price"
                label={"stocks.modals.add.fields.price.label"}
                placeholder={"stocks.modals.add.fields.price.placeholder"}
                formik={formik}
                required
              />
            </div>
          </SubmitModal>
        );
      }}
    </Formik>
  );
};

export default DialogEdit;
