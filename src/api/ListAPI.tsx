import {axiosClient} from "./axiosClient";
import {ListTodo} from "../components/ListTodo";
import {ListTodoName} from "../components/insterface";

const ListAPI = {
    getAll(){
        const url = `https://5d36d86c86300e0014b647c7.mockapi.io/todos`;
        return axiosClient.get(url);
    },
    addTodo(nameTodo: ListTodoName) {
        const url = `https://5d36d86c86300e0014b647c7.mockapi.io/todos`;
        axiosClient.post(url, nameTodo)
    },
    deleteTodo(id: string) {
        const url = `https://5d36d86c86300e0014b647c7.mockapi.io/todos/${id}`;
        axiosClient.delete(url)
    },
    updateTodo(id: string , nameTodo: ListTodoName) {
        const url = `https://5d36d86c86300e0014b647c7.mockapi.io/todos/${id}`;
        axiosClient.put(url, nameTodo)
    },
}
export default ListAPI;