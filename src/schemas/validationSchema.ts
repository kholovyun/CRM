import * as yup from "yup";

export const validationSchema = yup.object().shape({
    password: yup.string()
        .min(6, "Минимум 6 символов")
        .max(8, "Максимум 8 символов")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,8}$/,
            "Должен содержать минимум одну заглавную букву, одну строчную букву и цифру не должен содержать пробелы")
        .test("no-spaces", "Пароль не должен содержать пробелы", function (value) {
            if (value && /\s/.test(value)) {
                return false;
            }
            return true;
        })
        .required("Обязательно для заполнения"),
    email: yup.string().email("Введите корректный Email").required("Поле не должно быть пустым"),
});