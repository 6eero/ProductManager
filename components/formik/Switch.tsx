import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormikProps } from "formik";
import { useTranslations } from "next-intl";
import * as R from "ramda";

type Props = {
  name: string;
  label?: string;
  description?: string;
  formik: FormikProps<any>;
};

const FormikSwitch = ({ name, label, formik }: Props) => {
  const t = useTranslations("");

  const handleChange = (value: boolean) => {
    formik.setFieldValue(name, value);
  };

  return (
    <div className="grid gap-3">
      {R.isNotNil(label) && <Label htmlFor={name}>{t(label)}</Label>}

      <Switch
        id={name}
        checked={formik.values[name]}
        onCheckedChange={handleChange}
      />
    </div>
  );
};

export default FormikSwitch;
