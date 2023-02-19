import axios from "axios";

const todosApi = axios.create({
    // baseURL: "http://localhost:8080",
    // withCredentials: true // 쿠키 cors 통신 설정
})

export const getTodos = async () => {
    const response = await todosApi.get("/gadget/todos/1")
    return response.data;
}

export const getUsers = async () => {
    const response = await todosApi.get("/gadget/users/search")
    return response.data;
}

export const addTodo = async (todo) => {
    return await todosApi.post("/gadget/todos", todo)
}

export const updateTodo = async ({statename, contentid}) => {
    return await todosApi.patch(`/gadget/todos/move`, { spaceid : 1, statename : statename, contentid : contentid})
}

export const deleteTodo = async ({ id }) => {
    return await todosApi.delete(`/gadget/todos/${id}`, id)
}

export const getOrders = async ({ queryKey }) => {
    const spaceid = queryKey[1];
    const response = await todosApi.get(`/gadget/todos/order/${spaceid}`);
    // console.log(response.data);
    return response.data;
}

export const updateOrder = async ({spaceid, statename, stateindex}) => {
    console.log(spaceid, statename, stateindex);
    return await todosApi.patch(`/gadget/todos/order`, { spaceid : 1, statename : statename, stateindex : stateindex.toString()})
}

export const createTodoContent = async ({title, content, startdate, enddate, spaceid, statename}) => {
    console.log(title, content, startdate, enddate, spaceid, statename);
    return await todosApi.post(`/gadget/todos/todoContent`, { title : title, content : content, startdate : startdate, enddate : enddate,  spaceid : spaceid, statename : statename})
}

export const getTodoContent = async ({ queryKey }) => {
    const contentid = queryKey[1]
    return await todosApi.get(`/gadget/todos/todoContent/${contentid}`)
}

export const updateTodoContent = async ({title, content, startdate, enddate, spaceid, statename, contentid}) => {
    console.log(title, content, startdate, enddate, spaceid, statename, contentid);
    return await todosApi.patch(`/gadget/todos/todoContent`, { title : title, content : content, startdate : startdate, enddate : enddate,  spaceid : spaceid, statename : statename, contentid : contentid})
}

export const login = async (token) => {
    return await todosApi.post(`gadget/user/googleLogin`, { token : token });
}

export const createWorkSpace = async ({userid, spacename}) => {
    return await todosApi.post(`gadget/workspace/group`, { userid : userid, spacename : spacename} );
}

export const selectWorkSpace = async ({queryKey}) => {
    const userid = queryKey[1]
    return await todosApi.get(`/gadget/workspace/groupList/${userid}`);
}

export default todosApi 