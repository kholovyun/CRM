import * as yup from "yup";

export const validationSchemaRecommendation = yup.object().shape({
    text: yup.string().required("Обязательно для заполнения")
        .min(30, "Минимум 30 символов")
        .trim()
});