import App from "./App";
import { AuthenticatingPage } from "./routes/AuthenticatingPage";
import { NewPostPage } from "./routes/newPostPage";
import { PostsDashboard } from "./routes/PostsDashboard";
const routes = [
  {
    index: true,
    element: <AuthenticatingPage />,
  },
  {
    path: "/dashboard",
    element: <App />,
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
];

export default routes;
