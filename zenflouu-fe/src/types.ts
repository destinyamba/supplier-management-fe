import { green, blue, red, grey } from "@mui/material/colors";

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
  userId: string;
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

export interface IWorkOrder {
  id: string;
  notes: string;
  status: string;
  clientId: string;
  location: string;
  dueDate: Date;
  startDate: Date;
  projectManager: string;
  workOrderNumber: string;
  taskDescription: string;
}

export interface WOPagedResponse<T> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  wos: T[];
}

export interface ICreateWorkOrder {
  location: string;
  dueDate: string;
  startDate: string;
  taskDescription: string;
}

export enum WorkOrderStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export const mapWorkOrderStatus = (status: string): WorkOrderStatus => {
  switch (status) {
    case "COMPLETED":
      return WorkOrderStatus.COMPLETED;
    case "IN_PROGRESS":
      return WorkOrderStatus.IN_PROGRESS;
    case "CANCELLED":
      return WorkOrderStatus.CANCELLED;
    default:
      return WorkOrderStatus.PENDING;
  }
};

export interface Region {
  name: string;
  country: string;
  abbreviation: string;
}


export const getStatusConfig = (status: string) => {
  const mappedStatus = mapWorkOrderStatus(status);

  switch (mappedStatus) {
    case WorkOrderStatus.COMPLETED:
      return {
        backgroundColor: green[100],
        borderColor: green[200],
      };
    case WorkOrderStatus.IN_PROGRESS:
      return {
        backgroundColor: blue[100],
        borderColor: blue[200],
      };
    case WorkOrderStatus.CANCELLED:
      return {
        backgroundColor: red[100],
        borderColor: red[200],
      };
    default:
      return {
        backgroundColor: grey[100],
        borderColor: grey[200],
      };
  }
};