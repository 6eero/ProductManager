import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      // BASE
      case actions.GET: {
        state.data = {};
        state.loading = true;
        state.updating = false;
        state.error = false;
        return;
      }

      case actions.ADD:
      case actions.REMOVE:
      case actions.UPDATE: {
        state.loading = false;
        state.updating = true;
        state.error = false;
        return;
      }

      // SUCCESS
      case actions.GET_SUCCESS:
      case actions.ADD_SUCCESS:
      case actions.REMOVE_SUCCESS:
      case actions.UPDATE_SUCCESS: {
        const { data } = action.payload;
        state.data = data;
        state.loading = false;
        state.updating = false;
        state.error = false;
        return;
      }

      // FAIL
      case actions.GET_FAIL:
      case actions.ADD_FAIL:
      case actions.REMOVE_FAIL:
      case actions.UPDATE_FAIL: {
        const { error } = action.payload;
        state.loading = false;
        state.updating = false;
        state.error = error;
        return;
      }
    }
  }
);

export default reducer;
