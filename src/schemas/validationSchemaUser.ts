import * as yup from "yup";

export const validationSchemaUser = yup.object().shape({
    name: yup.string().min(1, "Минимум").required("Обязательно для заполнения"),
    email: yup.string()
        .email("Введите корректный Email")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Введите корректный Email")
        .required("Поле не должно быть пустым"),
});