import { useRoutes } from "react-router-dom";
import { AppRoutes } from "./app-routes";

const App = () => {
  return useRoutes(AppRoutes);
};

export default App;
