import { Dealer } from "./dealer";

export class Customer {
    id: number;
    name: string;
    cnpj: string;
    address: string;
    isActive: boolean;
    dealer: Dealer
}