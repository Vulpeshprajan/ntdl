import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	taskLists: [],
	noToDoLists: [],
	totalHrs: 0,
	isPending: false,
	status: "",
	message:"",
	itemToDelete: [],
	
};

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		requestPending: state => {
			state.isPending = true;
		},
		addTaskSuccess: (state, action) => {
			state.isPending = false;
			state.status = action.payload.status;
			state.message = action.payload.message;
		},
		fetchTaskSuccess: (state, { payload = []}) => {
		state.isPending = false;
		state.totalHrs = payload.reduce((subTtl, row) => subTtl + +row.hr, 0);
		state.taskLists = payload.filter(row => row.todo);
		state.noToDoLists = payload.filter(row => !row.todo );

		},

		updateTaskSuccess: (state,{payload=[]}) => {
			state.isPending = false;
			state.status = payload.status;
			state.message = payload.message;
		},

		deleteTaskSuccess: (state,{payload}) => {
			state.isPending = false;
			state.status = payload.status;
			state.message = payload.message;
			if (payload.status ==="success") state.itemToDelete =[];
		}, 

		requestFail: (state, payload) => {
			state.isPending = false;
			state.status ="error";
			state.message = payload;
		},
		setItemToDelete:(state, {payload: {checked, value} }) => {
			
			if (checked) {
			state.itemToDelete = [...state.itemToDelete, value];
		} else {
		const newlist = state.itemToDelete.filter(item => item !== value);
		state.itemToDelete= newlist;


		}

		//remove form array
	
		},
		
	
    }
});

const { reducer, actions } = taskSlice;

export const { requestPending, addTaskSuccess,fetchTaskSuccess, requestFail, updateTaskSuccess, setItemToDelete,
		deleteTaskSuccess } = actions;

export default reducer;
