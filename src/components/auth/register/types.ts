export interface IRegisterPage{
    firstName: string,
    lastName: string,
    email:string,
    phone: number,
    image: File|null,
    countyId: number,
    password:string,
    confirmPassword: string,
}

export interface ISelectItem{
    id:number;
    name: string;
}