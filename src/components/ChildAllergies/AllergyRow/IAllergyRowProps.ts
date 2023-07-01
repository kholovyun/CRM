import IAllergyGetDto from "../../../interfaces/IAllergy/IAllergyGetDto";

export default interface IAllergyRowProps {
    allergy: IAllergyGetDto
    deleteAllergy: () => void
}