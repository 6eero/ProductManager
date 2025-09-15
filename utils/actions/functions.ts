import _ from "lodash";
import * as R from "ramda";

export const getStartUpActions = (
  prefix: string
): { [key: string]: string } => {
  return {
    LOAD: `${prefix}_LOAD`,
    LOAD_SUCCESS: `${prefix}_LOAD_SUCCESS`,
    LOAD_FAIL: `${prefix}_LOAD_FAIL`,
  };
};

export const getStartUpActionsFunctions = (
  actions: any
): { [key: string]: any } => {
  return {
    load: (payload?: any) => ({
      type: actions.LOAD,
      payload: payload ?? {},
    }),
    loadSuccess: (payload?: any) => ({
      type: actions.LOAD_SUCCESS,
      payload: payload ?? {},
    }),
    loadFail: (payload?: any) => ({
      type: actions.LOAD_FAIL,
      payload: payload ?? {},
    }),
  };
};

export const getAsyncActions = (
  prefix: string,
  actions: string[],
  update?: boolean
) => {
  return R.reduce(
    (acc: any, action: string) => ({
      ...acc,
      [action]: `${prefix}_${action}`,
      [`${action}_SUCCESS`]: `${prefix}_${action}_SUCCESS`,
      [`${action}_FAIL`]: `${prefix}_${action}_FAIL`,
      ...(update ? { [`${action}_UPDATE`]: `${prefix}_${action}_UPDATE` } : {}),
    }),
    {},
    actions
  );
};

export const getAsyncActionsFunctions = (
  actions: any,
  types: string[],
  update?: boolean
): { [key: string]: any } => {
  return R.reduce(
    (acc: any, type: string) => {
      const camelCaseBaseAction = _.camelCase(type);

      return {
        ...acc,
        [camelCaseBaseAction]: (payload?: any) => ({
          type: actions[type],
          payload: payload ?? {},
        }),
        [`${camelCaseBaseAction}Success`]: (payload?: any) => ({
          type: `${actions[type]}_SUCCESS`,
          payload: payload ?? {},
        }),
        [`${camelCaseBaseAction}Fail`]: (payload?: any) => ({
          type: `${actions[type]}_FAIL`,
          payload: payload ?? {},
        }),
        ...(update
          ? {
              [`${camelCaseBaseAction}Update`]: (payload?: any) => ({
                type: `${actions[type]}_UPDATE`,
                payload: payload ?? {},
              }),
            }
          : {}),
      };
    },
    {},
    types
  );
};
