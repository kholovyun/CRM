import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { IMessage } from "../interfaces/IUser/IMessage";
import { IErrorResponse } from "../interfaces/IUser/IErrorResponse";
import { toast } from "react-toastify";

export const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
    const err = data as IErrorResponse<IMessage>;
    toast.error(`Ошибка ${err.data.message}`);
};

