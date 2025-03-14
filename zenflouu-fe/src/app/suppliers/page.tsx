import React from "react";
import ApprovedSupplierList from "@/components/ApprovedSuppliersList/ApprovedSupplierList";
import PageLayout from "../../components/pagelayout";
import Head from "next/head";

const Suppliers = () => {
  return (
    <>
      <title>ZenFlouu | Suppliers</title>
      <PageLayout showSideBar={true}>
        <ApprovedSupplierList />
      </PageLayout>
    </>
  );
};

export default Suppliers;
