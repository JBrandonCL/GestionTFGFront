/**
 * Consta de createdAt,fineId,id,isPaid,reason,userId,finesImport
 */
export interface FinesDetailsInterface {
    direction: string;
    zipCode: string;
    police_identification: string;
    vehicle:{
        linces_plate: string,
        chassis: string,
        mark: string,
        model: string,
        year: number,
        colour: string,
        type_Vehicle: string,
        registration_document: boolean,
        insurance: boolean,
    }
    reason: string;
    paid: boolean;
    createdAt: Date;
    referenceNumber: string;
    finesImport: number;
    description: string;
    usuario?:{
        name: string;
        lastname1: string;
        lastname2: string;
        dni: string;
        direction: string;
        zipcode: string;
        town: string;
        email: string;
    }
}