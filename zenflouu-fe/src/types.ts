export interface ISupplierCard {
  contractType: IContractType;
  supplierName: string;
  workStatus: IWorkStatus;
  requirementsStatus: IRequirementsStatus;
  services: string[];
  states: string[];
  yearsInOperation: number;
  revenue: IRevenue;
  numberOfEmployees: IEmployees;
  businessClassifications?: string[];
  safetyAndCompliance?: {
    trir: number;
    emr: number;
    coi: string;
    safetyProgram: string;
    oshaLogs: string;
    bankInfo: string;
  };
}

export enum IContractType {
  DIRECT = "Direct",
  SUBCONTRACTED = "Subcontracted",
}

export enum IRevenue {
  "0-1M GBP" = "0-1M GBP",
  "1-5M GBP" = "1-5M GBP",
  "5-10M GBP" = "5-10M GBP",
  "10+M GBP" = "10+M GBP",
}

export enum IEmployees {
  "0-10" = "0-10",
  "10-50" = "10-50",
  "50-100" = "50-100",
  "100-500" = "100-500",
  "500+" = "500+",
}

export enum IWorkStatus {
  APPROVED = "Approved",
  NOT_APPROVED = "Not Approved",
}

export enum IRequirementsStatus {
  REQUIREMENTS_PENDING = "Requirements Pending",
  REQUIREMENTS_SUBMITTED = "Requirements Submitted",
}
