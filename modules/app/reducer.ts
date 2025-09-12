import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      // BASE
      case actions.LOAD: {
        state.loading = true;
        state.error = false;
        return;
      }

      // SUCCESS
      case actions.LOAD_SUCCESS: {
        state.loading = false;
        state.error = false;
        return;
      }

      // FAIL
      case actions.LOAD_FAIL: {
        state.loading = false;
        state.error = true;
        return;
      }
    }
  }
);

export default reducer;
