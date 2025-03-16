import Clients from "@/components/Clients/Clients";
import PageLayout from "@/components/pagelayout";

const ClientPage = () => {
  return (
    <>
      <title>ZenFlouu | Clients </title>
      <PageLayout showSideBar={true}>
        <Clients />
      </PageLayout>
    </>
  );
};

export default ClientPage;
