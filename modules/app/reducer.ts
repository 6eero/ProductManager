import actions from "./actions";
import { produce } from "immer";

/**
 * This reducer manages generic application-level state updates
 * based on dispatched actions. It is designed to handle global
 * actions such as user session checks.
 *
 * Responsibilities:
 *  - Listen for specific action types and update the state accordingly.
 *  - Follow the action lifecycle pattern:
 *      START → SUCCESS → FAIL.
 *  - Keep state shape consistent, typically including:
 *      - data: the payload of the successful action
 *      - loading: boolean flag indicating pending operations
 *      - error: error object or false when no error occurs
 *
 * Scope:
 *  - Only handles global or shared actions relevant across the app.
 *  - Feature-specific state should be managed by dedicated reducers.
 */

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      // BASE
      case actions.WHO_AM_I: {
        state.data = {};
        state.loading = true;
        state.error = false;
        return;
      }

      // SUCCESS
      case actions.WHO_AM_I_SUCCESS: {
        const { data } = action.payload;
        state.data = data;
        state.loading = false;
        state.error = false;
        return;
      }

      // FAIL
      case actions.WHO_AM_I_FAIL: {
        const { error } = action.payload;
        state.loading = false;
        state.error = error;
        return;
      }
    }
  }
);

export default reducer;
