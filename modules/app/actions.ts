import {
  getAsyncActions,
  getAsyncActionsFunctions,
} from "@/utils/actions/functions";
import * as R from "ramda";

const PREFIX = "APP";
const types = ["WHO_AM_I"];

const actions: any = {
  ...getAsyncActions(`${PREFIX}`, types),
};

const actionsFunctions: any = {
  ...getAsyncActionsFunctions(actions, types),
};

const aa = R.mergeDeepLeft(actions, actionsFunctions);

console.log(aa);

export default aa;
