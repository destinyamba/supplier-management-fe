import { Grid2 } from "@mui/material";
import Layout from "../layout";
import PageLayout from "@/components/pagelayout";

const Client = () => {
  return (
    <>
      <PageLayout showSideBar={true}>
        <Grid2 container>{/* Add your content here */}This is my client</Grid2>
      </PageLayout>
    </>
  );
};

export default Client;
