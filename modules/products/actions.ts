import {
  getAsyncActions,
  getAsyncActionsFunctions,
} from "@/utils/actions/functions";
import * as R from "ramda";

const PREFIX = "STOCKS";
const types = ["GET", "ADD", "REMOVE", "UPDATE"];

const actions: any = {
  ...getAsyncActions(`${PREFIX}`, types),
};

const actionsFunctions: any = {
  ...getAsyncActionsFunctions(actions, types),
};

const aa = R.mergeDeepLeft(actions, actionsFunctions);

export default aa;
