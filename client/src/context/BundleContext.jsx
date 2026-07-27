import { createContext, useContext, useReducer, useCallback } from "react";

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
        const { [key]: _, ...items } = state.items;
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

const saved = (() => {
  try {
    const data = localStorage.getItem("bundle");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
})();

const INITIAL = saved ?? { items: {}, plan: null };

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

export function useBundle() {
  const ctx = useContext(BundleContext);
  if (!ctx) throw new Error("useBundle must be used within BundleProvider");
  return ctx;
}
