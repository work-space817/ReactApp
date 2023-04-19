import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
  return (
    <>
      <DefaultHeader />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
