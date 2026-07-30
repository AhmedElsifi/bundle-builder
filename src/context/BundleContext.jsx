import { createContext, useReducer, useCallback } from "react";

const BundleContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const key = action.vid != null ? `${action.pid}|${action.vid}` : action.pid;
      const item = state.items[key];
      return {
        ...state,
        items: {
          ...state.items,
          [key]: { pid: action.pid, vid: action.vid, qty: (item?.qty ?? 0) + 1 },
        },
      };
    }
    case "REMOVE": {
      const key = action.vid != null ? `${action.pid}|${action.vid}` : action.pid;
      if (!state.items[key]) return state;
      if (state.items[key].qty <= 1) {
        const items = { ...state.items };
        delete items[key];
        return { ...state, items };
      }
      return {
        ...state,
        items: { ...state.items, [key]: { ...state.items[key], qty: state.items[key].qty - 1 } },
      };
    }
    case "PLAN":
      return { ...state, plan: action.id };
    case "CLEAR":
      return { items: {}, plan: null };
    default:
      return state;
  }
}

const DEFAULT_BUNDLE = {
  items: {
    "wyze-cam-v4|v4-white": { pid: "wyze-cam-v4", vid: "v4-white", qty: 1 },
    "wyze-cam-pan-v3": { pid: "wyze-cam-pan-v3", vid: null, qty: 2 },
    "wyze-motion-sensor": { pid: "wyze-motion-sensor", vid: null, qty: 2 },
    "wyze-hub": { pid: "wyze-hub", vid: null, qty: 1 },
    "wyze-microsd-256gb": { pid: "wyze-microsd-256gb", vid: null, qty: 2 },
  },
  plan: "wyze-duo-cam-unlimited",
};

const saved = (() => {
  try {
    const raw = localStorage.getItem("bundle");
    if (raw === null) return "USE_DEFAULT";
    const parsed = JSON.parse(raw);
    if (parsed._v !== 1) return "USE_DEFAULT";
    return { items: parsed.items, plan: parsed.plan };
  } catch {
    return "USE_DEFAULT";
  }
})();

const INITIAL = saved === "USE_DEFAULT" ? DEFAULT_BUNDLE : saved;

export function BundleProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const add = useCallback((pid, vid) => dispatch({ type: "ADD", pid, vid }), []);
  const remove = useCallback((pid, vid) => dispatch({ type: "REMOVE", pid, vid }), []);
  const setPlan = useCallback((id) => dispatch({ type: "PLAN", id }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  return (
    <BundleContext.Provider value={{ items: state.items, plan: state.plan, add, remove, setPlan, clear }}>
      {children}
    </BundleContext.Provider>
  );
}

export { BundleContext };
