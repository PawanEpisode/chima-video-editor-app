import { createSlice } from "@reduxjs/toolkit";

const videoEditorInitialState = {
    selectedSidebarMenuOption: 'video'
}

export const videoEditorSlice = createSlice({
    name: 'videoEditor',
    initialState: videoEditorInitialState,
    reducers: {
        updateSelectedSidebarMenuOption: (state) => {
            state.selectedSidebarMenuOption = state.selectedSidebarMenuOption
        }
    }
})

export const { updateSelectedSidebarMenuOption } = videoEditorSlice.actions ;

export default videoEditorSlice.reducer