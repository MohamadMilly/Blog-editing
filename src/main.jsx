import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes";

// contexts
import { AuthProvider } from "./contexts/authContext";
import { UserProvider } from "./contexts/userContext";
import { MyPostsProvider } from "./contexts/myPostsContext";
import { CategoriesProvider } from "./contexts/categoriesContext";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <MyPostsProvider>
          <CategoriesProvider>
            <RouterProvider router={router} />
          </CategoriesProvider>
        </MyPostsProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
