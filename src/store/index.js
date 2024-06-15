import { createContext } from "react";

import globalStore from "./globalStore.js";

export { globalStore }

export const storesContext = createContext({ globalStore });