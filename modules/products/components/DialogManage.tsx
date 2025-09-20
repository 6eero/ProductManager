import FormikInput from "@/components/formik/Input";
import FormikSelect from "@/components/formik/Select";
import SubmitModal from "@/components/modals/SubmitModal";
import { Product } from "@/models/products";
import { getCategories } from "@/models/products/constants";
import { Formik } from "formik";
import { useTranslations } from "next-intl";

const DialogManage = ({
  open,
  setOpen,
  mode,
  onSubmit,
  validationSchema,
  product,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  mode: "add" | "edit";
  onSubmit: (values: any) => void;
  validationSchema: any;
  product?: Product;
}) => {
  const t = useTranslations("");

  const initialValues = {
    id: product?.id || "",
    name: product?.name || "",
    quantity: product?.quantity || 0,
    category: product?.category || "",
    price: product?.price || 0,
  };

  return (
    <Formik
      key={open ? "open" : "closed"}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        setOpen(false);
      }}
    >
      {(formik) => (
        <SubmitModal
          title={`products.modals.${mode}.title`}
          dscription={`products.modals.${mode}.description`}
          okButtonText={`products.modals.${mode}.ok`}
          cancelButtonText={`products.modals.${mode}.cancel`}
          open={open}
          setOpen={setOpen}
          onSubmit={() => formik.handleSubmit()}
        >
          <div className="flex flex-col gap-6 my-4">
            {/* campi comuni */}
            <FormikInput
              data-testid="input-name"
              name="name"
              label={"products.modals.add.fields.name.label"}
              placeholder={"products.modals.add.fields.name.placeholder"}
              formik={formik}
              required
            />
            <FormikInput
              data-testid="input-quantity"
              name="quantity"
              label={"products.modals.add.fields.quantity.label"}
              placeholder={"products.modals.add.fields.quantity.placeholder"}
              formik={formik}
              required
            />
            <FormikSelect
              data-testid="select-category"
              name="category"
              label={"products.modals.add.fields.category.label"}
              placeholder={"products.modals.add.fields.category.placeholder"}
              formik={formik}
              required
              options={getCategories(t)}
            />
            <FormikInput
              data-testid="input-price"
              name="price"
              label={"products.modals.add.fields.price.label"}
              placeholder={"products.modals.add.fields.price.placeholder"}
              formik={formik}
              required
            />
          </div>
        </SubmitModal>
      )}
    </Formik>
  );
};

export default DialogManage;
