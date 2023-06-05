import * as Yup from "yup";

export const validationFirst = Yup.object().shape({
    name: Yup.string().required("Поле 'Имя' обязательно для заполнения"),
    surname: Yup.string().required("Поле 'Фамилия' обязательно для заполнения"),
    email: Yup.string().required("Поле 'Email' обязательно для заполнения").email("Некорректный формат Email"),
    phone: Yup.string().required("Поле 'Телефон' обязательно для заполнения")
});
export const validationSec = Yup.object().shape({
    child: Yup.object().shape({
        name: Yup.string().required("Поле 'Имя ребенка' обязательно для заполнения"),
        surname: Yup.string().required("Поле 'Фамилия ребенка' обязательно для заполнения"),
        dateOfBirth: Yup.string().required("Поле 'Дата рождения ребенка' обязательно для заполнения"),
        sex: Yup.string().required("Поле 'Пол ребенка' обязательно для заполнения"),
        height: Yup.number().required("Поле 'Рост ребенка' обязательно для заполнения"),
        weight: Yup.number().required("Поле 'Вес ребенка' обязательно для заполнения").nonNullable(),
    }),
});