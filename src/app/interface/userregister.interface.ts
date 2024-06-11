export interface UserRegisterInterface {
    name: string;
    lastname1: string;
    lastname2: string;
    dni: string;
    direction: string;
    zipcode: number;
    town: string;
    username: string;
    email: string;
    password: string;
    isDeleted?: boolean;
}