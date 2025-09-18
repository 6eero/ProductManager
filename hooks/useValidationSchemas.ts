import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useValidationSchemas = () => {
  const t = useTranslations("");

  const product = Yup.object().shape({
    name: Yup.string().required(t("validation.required")),
    quantity: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : Number(originalValue)
      )
      .typeError(t("validation.invalid"))
      .required(t("validation.required"))
      .min(1, t("validation.positive")),
    category: Yup.string().required(t("validation.required")),
    price: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : Number(originalValue)
      )
      .typeError(t("validation.invalid"))
      .required(t("validation.required"))
      .min(0.01, t("validation.positive")),
  });

  return { product };
};
