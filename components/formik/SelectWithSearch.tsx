import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikProps } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import * as R from "ramda";

const FormikSelectWithSearch = ({
  name,
  placeholder,
  label,
  domain,
  disabled,
  formik,
}: {
  name: string;
  placeholder: string;
  label: string;
  domain: string[];
  disabled: boolean;
  formik: FormikProps<any>;
}) => {
  const t = useTranslations("");
  const [detailCard, setDetailCard] = useState<string[]>([]);

  const handleClick = (element: string) => {
    formik.setFieldValue(name, element);
    setDetailCard([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const element = e.target.value.trim().toUpperCase();

    if (R.isEmpty(element)) {
      setDetailCard([]);
    } else {
      const matches = R.pipe(
        R.filter((t: string) => t === element),
        R.take(5)
      )(domain) as string[];

      const startsWith = R.pipe(
        R.filter((t: string) => t.startsWith(element) && t !== element),
        R.take(5 - matches.length)
      )(domain) as string[];

      const contains = R.pipe(
        R.filter(
          (t: string) =>
            t.includes(element) &&
            !matches.includes(t) &&
            !startsWith.includes(t)
        ),
        R.take(5 - matches.length - startsWith.length)
      )(domain) as string[];

      const filteredLabels = [...matches, ...startsWith, ...contains];

      setDetailCard(filteredLabels);
    }
  };
  return (
    <div className="grid gap-3 relative">
      <Label>{t(label)}</Label>
      <Input
        name={name}
        placeholder={t(placeholder)}
        value={formik.values[name] ?? ""}
        onChange={handleChange}
        disabled={disabled}
      />
      {R.isNotEmpty(detailCard) && (
        <div className="absolute top-full mt-1 left-0 w-full bg-card text-card-foreground rounded-md border shadow-lg z-50">
          {R.map((element: string) => (
            <div
              className="m-2 p-2 bg-card-2 rounded-md hover:outline cursor-pointer"
              onClick={() => handleClick(element)}
              key={element}
            >
              {element}
            </div>
          ))(detailCard)}
        </div>
      )}
    </div>
  );
};

export default FormikSelectWithSearch;
