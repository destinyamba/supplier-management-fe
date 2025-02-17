import { SideBar } from "xarton-1";

export default function Layout({ children, showSideBar }) {
  return (
    <>
      {showSideBar && (
        <>
          <SideBar />
          <main>{children}</main>
        </>
      )}
    </>
  );
}
