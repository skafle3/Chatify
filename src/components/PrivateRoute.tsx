import { Navigate, useLocation } from "react-router-dom";

import { useUserStore } from "../library";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const location = useLocation();

  if (!currentUser)
    return (
      // redirect to requested URL after authorization
      <Navigate
        to={`/sign-in?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`}
      />
    );

  return <>{children}</>;
};
