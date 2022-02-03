import { useRouter } from "next/router";
import React from "react";

import LoadingOverlay from "../components/LoadingOverlay";
import { AuthUser, useAuthUser } from "../contexts/auth-user-context";

// First we need to add a type to let us extend the incoming component.
type ExtraInfoType = {
  authUser: AuthUser;
};
// Mark the function as a generic using P (or whatever variable you want)
export function withAuthUser<P>(
  // Then we need to type the incoming component.
  // This creates a union type of whatever the component
  // already accepts AND our extraInfo prop
  WrappedComponent: React.ComponentType<P & ExtraInfoType>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const { authProcessFinished, authUser } = useAuthUser();
    const router = useRouter();

    if (!authProcessFinished) {
      return <LoadingOverlay />;
    }

    if (!authUser) {
      router.replace("/signin");

      return null;
    }

    // At this point, the props being passed in are the original props the component expects.
    return <WrappedComponent {...props} authUser={authUser} />;
  };

  return ComponentWithExtraInfo;
}
