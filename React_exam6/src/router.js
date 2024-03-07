import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AddMedicine from "./components/Medical/AddMedicine";
import ViewMedicine from "./components/Medical/ViewMedicine";
import EditMedicine from "./components/Medical/EditMedicine";
import Home from "./components/Medical/Home";
import Medicines from "./components/Medical/Medicines";

const router = createBrowserRouter([
  { path: '/', element: < Login/> }, 
  { path: 'Medical/data/create', element: <AddMedicine /> },
  { path: 'Medical/data/:medId', element: <ViewMedicine /> },
  { path: 'Medical/data/:medId/edit', element: <EditMedicine /> },
  { path: 'Medical/data/Home',  element: <Home /> },
  { path: 'Register', element: <Register /> },
  { path: 'login', element: <Login /> },
  {path:'Medical/data/Medicines',element: <Medicines />}
  
]);
export default router;