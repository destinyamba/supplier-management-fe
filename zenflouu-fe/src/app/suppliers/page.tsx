import React from "react";
import ApprovedSupplierList from "@/components/ApprovedSuppliersList/ApprovedSupplierList";
import PageLayout from "../../components/pagelayout";

const Suppliers = () => {
  return (
    <PageLayout showSideBar={true}>
      <ApprovedSupplierList />
    </PageLayout>
  );
};

export default Suppliers;
