import { useState } from "react";

/**
 * A hook that returns an array, a function to
 * add more values to the array if they are unique,
 * a function to remove items from the array, and function to check
 * if the array has an item.
 * @param {iterable} init
 */
export default function useSetAsArray(init = null) {
  const set = new Set(init);
  const [state, setState] = useState(Array.from(set));
  const addToSet = (val) => {
    set.add(val);
    setState(Array.from(set));
  };
  const removeFromSet = (val) => {
    set.delete(val);
    setState(Array.from(set));
  };
  const has = (val) => set.has(val);
  return [state, addToSet, removeFromSet, has];
}
