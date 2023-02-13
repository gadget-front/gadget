import axios from "axios";

const todosApi = axios.create({
    // baseURL: "http://localhost:8080",
    // withCredentials: true // 쿠키 cors 통신 설정
})

export const getTodos = async () => {
    const response = await todosApi.get("/gadget/todos/1")
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

export const createTodoContent = async ({title, content, statedate, enddate, stateid}) => {
    return await todosApi.post(`/gadget/todos/todoContent`, { title : title, content : content, statedate : statedate, enddate : enddate,  stateid : stateid})
}

export const getTodoContent = async ({ queryKey }) => {
    const contentid = queryKey[1]
    return await todosApi.get(`/gadget/todos/todoContent/${contentid}`)
}

export default todosApi 