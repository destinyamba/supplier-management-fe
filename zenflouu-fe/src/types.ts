export interface ISupplierCard {
  contractType: IContractType;
  supplierName: string;
  workStatus: IWorkStatus;
  requirementsStatus: IRequirementsStatus;
  services: string[];
  states: string[];
  yearsOfOperation: number;
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
  NO_CONTRACT = "No Contract",
  SUBCONTRACTED = "Subcontracted",
}

export const mapContractType = (contractType: string): IContractType => {
  switch (contractType) {
    case "Direct":
      return IContractType.DIRECT;
    case "Subcontracted":
      return IContractType.SUBCONTRACTED;
    case "NO_CONTRACT":
    default:
      return IContractType.NO_CONTRACT;
  }
};

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

export const mapWorkStatus = (workStatus: string): IWorkStatus => {
  switch (workStatus) {
    case "APPROVED":
      return IWorkStatus.APPROVED;
    case "NOT_APPROVED":
    default:
      return IWorkStatus.NOT_APPROVED;
  }
};

export enum IRequirementsStatus {
  REQUIREMENTS_PENDING = "Requirements Pending",
  REQUIREMENTS_SUBMITTED = "Requirements Submitted",
}

export const mappedRequirementsStatus = (
  requirementsStatus: string
): IRequirementsStatus => {
  switch (requirementsStatus) {
    case "PENDING":
      return IRequirementsStatus.REQUIREMENTS_PENDING;
    case "SUBMITTED":
    default:
      return IRequirementsStatus.REQUIREMENTS_SUBMITTED;
  }
};

export enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

export interface User {
  id: string;
  name: string;
  userType: string;
  organizationName: string;
  email?: string;
  lastSignIn?: Date;
  createdAt?: Date;
  role?: Role;
  orgId?: string;
}

export interface NavItems {
  label: string;
  href: string;
  icon: React.ReactNode;
  badgeCount?: number;
  onClick?: () => void;
}
