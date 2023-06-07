import { JSXElementConstructor } from "react"


export default interface IPhoneMaskProps {
    field: JSXElementConstructor<any>
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void
}