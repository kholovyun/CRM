import * as yup from "yup";

export const validationSchemaCreateVisit = yup.object().shape({
    reason: yup.string()
        .max(30, "Максимум 30 символов")
        .required("Обязательно для заполнения"),
    clinicData: yup.string()
        .max(80, "Максимум 80 символов")
        .trim()
        .required("Обязательно для заполнения"),
    conclision: yup.string()
        .max(40, "Максимум 40 символов")
        .trim()
        .required("Обязательно для заполнения"),
    appoinment: yup.string()
        .max(80, "Максимум 80 символов")
        .trim()
        .required("Обязательно для заполнения"),
    place: yup.string()
        .max(40, "Максимум 40 символов")
        .trim()
        .required("Обязательно для заполнения"),
    date: yup.date()
        .required("Обязательно для заполнения")
        .nullable()
});