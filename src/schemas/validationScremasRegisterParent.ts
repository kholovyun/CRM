import * as Yup from "yup";

export const validationFirst = Yup.object().shape({
    name: Yup.string().required("Обязательно для заполнения"),
    surname: Yup.string().required("Обязательно для заполнения"),
    email: Yup.string().required("Обязательно для заполнения").email("Некорректный формат Email"),
    phone: Yup.string().required("Обязательно для заполнения")
});
export const validationSec = Yup.object().shape({
    child: Yup.object().shape({
        name: Yup.string().required("Обязательно для заполнения"),
        surname: Yup.string().required("Обязательно для заполнения"),
        dateOfBirth: Yup.string().required("Обязательно для заполнения"),
        sex: Yup.string().required("Обязательно для заполнения"),
        height: Yup.number().required("Обязательно для заполнения").nonNullable(),
        weight: Yup.number().required("Обязательно для заполнения").nonNullable(),
    }),
});