import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
