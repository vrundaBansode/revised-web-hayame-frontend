import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import About from "./Pages/About/About";
import DashboardPage from "./components/DashboradPage/DashboardPage";
import {
  Inventory,
  Dashboard,
  Customers,
  Profile,
  Orders,
  AdminWorkforceList,
  AdminBookings,
  // AllocateLabour,
} from "./components/DashboradPage/Pages";
import DashboardForm from "./components/DashboradPage/Pages/Dashboard/DashboardForm";
import UpdateLabourDetails from "./components/DashboradPage/Pages/UpdatelabourDetails/UpdateLabourDetails";
import AllocateLabour from "./components/DashboradPage/Pages/AllocateLabour/AllocateLabour";

function App() {
  // const [loggedIn, setloggedIn] = useState(false)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/about-us",
      element: <About />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
      children: [
        {
          path: "/dashboard/profile",
          element: <Profile />,
        },
        {
          path: "/dashboard/orders",
          element: <Orders />,
        },
        {
          path: "/dashboard/customers",
          element: <Customers />,
        },
        {
          path: "/dashboard/dashboardform",
          element: <DashboardForm />,
        },
        {
          path: "/dashboard/workforce-list",
          element: <AdminWorkforceList />,
        },
        {
          path: "/dashboard/check-bookings",
          element: <AdminBookings />,
        },
        {
          path: "/dashboard/update-labour-details",
          element: <UpdateLabourDetails />,
        },
        {
          path: "/dashboard/allocate-labours",
          element: <AllocateLabour />,
        },
      ],
    },
    {
      path: "/dashboard/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/dashboard/inventory",
      element: <Inventory />,
    },
  ]);

  return (
    <div className="App">
      {/* <LandingPage /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

const Root = () => {
  return (
    <div>
      <LandingPage />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
