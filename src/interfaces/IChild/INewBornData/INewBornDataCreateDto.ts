export default interface INewBornDataCreateDto {
    childId: string;
    dischargedDate: Date;
    pregnancyN: number;
    pregnancyDescript: string;
    birthN: number;
    gestAge: number;
    period1: number;
    period2: number;
    amnAbsPeriod: number;
    amnDescript: string;
    anesthesia: string;
    postBirthPeriod: string;
    motherState: string;
    birthWeight: number;
    birthHeight: number;
    newbornState: string;
    apgarScore: string;
    reanimation: string;
    breastTry: boolean;
    feeding: string;
    diagnosis: string;
    examination: string;
    treatment: string;
    eyes: string;
    reflexes: string;
    skin: string;
    organs: string;
    stool: string;
    diuresis: string;
    umbilicalCord: string;
    examed_by: string;
    notes? :string
    feedingReason?: string
}