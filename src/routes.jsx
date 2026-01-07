import App from "./App";
import { AuthenticatingPage } from "./routes/AuthenticatingPage";
import { loader as postLoader, UpsertPostPage } from "./routes/UpsertPostPage";
import { PostsDashboard } from "./routes/PostsDashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { UnAuthorizedPage } from "./routes/UnAuthorizedPage";
const routes = [
  {
    index: true,
    element: <AuthenticatingPage />,
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
        element: <UpsertPostPage mode="adding" />,
        loader: postLoader,
      },
      {
        path: "/dashboard/posts/:slug/edit",
        element: <UpsertPostPage mode="editing" />,
        loader: postLoader,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <UnAuthorizedPage />,
  },
];

export default routes;
