import App from "./App";
import { AuthenticatingPage } from "./routes/AuthenticatingPage";
import { NewPostPage } from "./routes/NewPostPage";
import { PostsDashboard } from "./routes/PostsDashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { UnAuthorizedPage } from "./routes/UnAuthorizedPage";
const routes = [
  {
    index: true,
    element: <AuthenticatingPage />,
    errorElement: <UnAuthorizedPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PostsDashboard />,
      },
      {
        path: "/dashboard/posts/new",
        element: <NewPostPage />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <UnAuthorizedPage />,
  },
];

export default routes;
