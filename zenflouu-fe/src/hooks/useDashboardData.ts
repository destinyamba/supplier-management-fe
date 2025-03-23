import {
  getAverageCompletionTime,
  getClientSuppliersOnboardedOverTime,
  getSupplierContractTypeCount,
  getSupplierRequirementStatusCount,
  getSuppliersByService,
  getSupplierWorkStatusCount,
  getTotalSuppliers,
  getTotalUpcomingWO,
  getTotalWO,
  getWOByService,
  getWOStatusCount,
} from "@/apis/metricsService";
import { useState, useEffect } from "react";

export const useDashboardData = () => {
  const [totalSuppliers, setTotalSuppliers] = useState([]);
  const [totalWO, setTotalWO] = useState([]);
  const [totalUpcomingWO, setTotalUpcomingWO] = useState([]);
  const [requirementsCount, setRequirementsCount] = useState([]);
  const [workStatusCount, setWorkStatusCount] = useState([]);
  const [contractTypeCount, setContractTypeCount] = useState([]);
  const [woStatusCount, setWoStatusCount] = useState([]);
  const [suppliersOverTime, setSuppliersOverTime] = useState([]);
  const [avgWOCompletionTime, setAvgWOCompletionTime] = useState([]);
  const [woByService, setWOByService] = useState([]);
  const [suppliersByService, setSuppliersByService] = useState([]);

  useEffect(() => {
    getTotalSuppliers().then(setTotalSuppliers);
    getTotalWO().then(setTotalWO);
    getTotalUpcomingWO().then(setTotalUpcomingWO);
    getSupplierRequirementStatusCount().then(setRequirementsCount);
    getSupplierWorkStatusCount().then(setWorkStatusCount);
    getSupplierContractTypeCount().then(setContractTypeCount);
    getWOStatusCount().then(setWoStatusCount);
    getClientSuppliersOnboardedOverTime().then(setSuppliersOverTime);
    getAverageCompletionTime().then(setAvgWOCompletionTime);
    getWOByService().then(setWOByService);
    getSuppliersByService().then(setSuppliersByService);
  }, []);

  return {
    totalSuppliers,
    totalWO,
    totalUpcomingWO,
    requirementsCount,
    workStatusCount,
    contractTypeCount,
    woStatusCount,
    suppliersOverTime,
    avgWOCompletionTime,
    woByService,
    suppliersByService,
  };
};
