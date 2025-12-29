import App from "./App";
import { AuthenticatingPage } from "./routes/AuthenticatingPage";
const routes = [
  {
    index: true,
    element: <AuthenticatingPage />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },
];

export default routes;
