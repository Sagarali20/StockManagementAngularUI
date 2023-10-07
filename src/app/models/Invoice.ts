export class Invoice{
    Id:number=0;
    InvoiceId!:string;
    CustomerId!:string;
    Amount!:number;
    Tax!:number;
    TotalAmount!:number;
    Deposit!:number;
    Blance!:number;
    TodayAdvance!:number;
    Status!:string;
    InvoiceDate!:Date;
    PaymentType!:string;
    Email!:string;
    PhoneNumber!:string;
}