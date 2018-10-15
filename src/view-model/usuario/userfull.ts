import { Group } from "./group";

export class UserFull {
    id: number;
    matricula: string;
    name: string;
    email: string;
    cpf: string;
    dateBorn: string;
    password: string;
    sector: string;
    phone: string;
    dateExpire: string;
    dateCreated: string;
    creator: string;
    groups: Group[];
    cidade: string;
    cluster: string;
    updated: boolean;
}