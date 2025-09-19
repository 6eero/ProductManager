import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikProps } from "formik";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const FormikInput = ({
  name,
  placeholder,
  label,
  type,
  formik,
  required = false,
  disabled = false,
}: {
  name: string;
  placeholder: string;
  label: string;
  type?: string;
  formik: FormikProps<any>;
  required?: boolean;
  disabled?: boolean;
}) => {
  const t = useTranslations("");

  const error = formik.errors[name];
  const touched = formik.touched[name];
  const showError = touched && error && typeof error === "string";

  return (
    <div className="grid gap-1">
      <div className={required ? "flex gap-1" : ""}>
        {required && <span className="text-secondary">*</span>}
        <Label htmlFor={name}>{t(label)}</Label>
      </div>
      <Input
        className={cn("", showError && "border-red-500")}
        type={type}
        name={name}
        id={name}
        placeholder={t(placeholder)}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={disabled}
      />
      {showError && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default FormikInput;
