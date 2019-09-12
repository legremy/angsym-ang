export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  invoices?: any[];
  user?: any;
  unpaidAmount?: number;
  paidAmount?: number;
  totalAmount?: number;
}
