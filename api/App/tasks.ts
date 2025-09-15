import { useAppDispatchContext } from "@/context/App";
import actions from "@/modules/app/actions";
import * as APIApp from "./endpoint";

/**
 * This function defines and exposes generic application-level
 * actions that interact with the App context and API modules.
 *
 * Responsibilities:
 *  - Dispatch lifecycle events (start → success → fail).
 *  - Execute async operations (e.g., API calls).
 *  - Update global state accordingly.
 *
 * Scope:
 *  - Only contains actions that are considered "global" to the app
 *    (e.g., authentication, session validation, user state).
 *  - Feature-specific actions should be defined in their own modules.
 */
export const useAppActions = () => {
  const dispatch = useAppDispatchContext();

  return {
    onWhoAmI: async () => {
      try {
        dispatch(actions.whoAmI({}));
        const { data } = await APIApp.whoAmI();

        dispatch(actions.whoAmISuccess({ data }));
      } catch (error) {
        dispatch(actions.whoAmIFail({ error }));
      }
    },
  };
};
