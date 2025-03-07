import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeRoute from "./routes/home/HomeRoute";
import RootRoute from "./routes/RootRoute";
import ClaimRoute from "./routes/claim/ClaimRoute";
import UsernameRoute from "./routes/username/UsernameRoute";
import { SimplePool } from "nostr-tools";

declare global {
  interface Window {
    nostr: {
      getPublicKey: () => Promise<string>;
      signEvent: (e: {
        kind: number;
        content: string;
        created_at: number;
        tags: string[][];
      }) => Promise<{
        kind: number;
        content: string;
        created_at: number;
        tags: string[][];
        id: string;
        sig: string;
        pubkey: string;
      }>;
    };
  }
}

export const pool = new SimplePool();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        path: "",
        element: <HomeRoute />,
      },
      {
        path: "claim",
        element: <ClaimRoute />,
      },
      {
        path: "username",
        element: <UsernameRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
