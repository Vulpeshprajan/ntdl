import { requestPending, addTaskSuccess, fetchTaskSuccess,updateTaskSuccess, requestFail,
		deleteTaskSuccess } from "./taskSlice";

import {  } from "../../";
import { getTaskLists, createTask,  switchTask, deleteTaskLists } from "../../api/taskApi";

export const addTask = fromDt => async dispatch => {
    try {

        dispatch(requestPending());
        const result = await createTask(fromDt);
        // call the api to send the data
        dispatch(addTaskSuccess(result));
        result.status === "success" && dispatch(fetchTaskLists());
    } catch (error) {
            dispatch(requestFail(error.message));
    }


};

export const fetchTaskLists =() => async dispacth => {
    try {
        dispacth(requestPending());
        const taskArg = await getTaskLists();
        dispacth(fetchTaskSuccess(taskArg));
        
    } catch (error) {
        dispacth(requestFail(error.message));
        
    }
};

export const taskSwitch = toUpdate => async dispatch => {
    try {
        dispatch(requestPending());
        const result = await switchTask (toUpdate);
        dispatch (updateTaskSuccess(result)) ;
        result.status === "success" && dispatch(fetchTaskLists());
    } catch (error) {
        dispatch(requestFail(error.message));
        
    }

};


export	const deleteTasks = (ids) => async dispatch => {
		try {
            if (
			window.confirm("Are  you sure you want to delete the selected items?")
		) {
        dispatch(requestPending());
        const result = await deleteTaskLists(ids);
            dispatch(deleteTaskSuccess(result));

         result.status === "success" && dispatch(fetchTaskLists());
			// const deleteArg = itemToDelete.concat(notToDoItemToDelete);
			// const result = await deleteTaskLists(deleteArg);
		}
        } catch (error) {
                    dispatch(requestFail(error.message));

        }
	};