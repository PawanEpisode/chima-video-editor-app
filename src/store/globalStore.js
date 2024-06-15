import { configureStore } from "@reduxjs/toolkit";

import videoEditorReducer from "./videoEditor/videoEditorSlice.js";

const store = configureStore({
    reducer: {
        videoEditor: videoEditorReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: true })
})

export default store