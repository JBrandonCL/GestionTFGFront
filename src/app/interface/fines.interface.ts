/**
 * Consta de createdAt,fineId,id,isPaid,reason,userId
 */
export interface FinesInterface {
    id?: string;
    userId?: string;
    fineId?: string;
    isPaid?: boolean;
    createdAt?: string;
    reason?: string;
  }