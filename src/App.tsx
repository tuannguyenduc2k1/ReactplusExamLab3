import React, {useEffect, useState} from 'react';
import { Modal } from 'antd';

import {ListTodo} from './components/ListTodo'
import {AddTodoForm} from './components/AddTodoForm'

import 'antd/dist/antd.css'
import './App.css';
import ListAPI from "./api/ListAPI";
import {ListTodoName} from "./components/insterface";

function App() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [todos,setTodos] = useState<ListTodoName[]>([]);
    const [availableTodos,setAvailableTodos] = useState<ListTodoName | null>(null)

    useEffect(() =>{
        ListAPI.getAll()
            .then((res) => setTodos(res.data))
            .catch((err) => console.log(err))
            .then(() => {})
    },[]);


    const handleOpenModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleClose = () => {
        setIsModalVisible(false);
    }

    const handleAddItem = async (nameTodo :ListTodoName)=>{
        handleClose();
        try{
            await ListAPI.addTodo(nameTodo);
            setTodos([...todos,nameTodo]);
        }catch (error){
            console.log(error);
        }
    };
    const handleDeleteTodo = async (id : string) => {
      try{
          await ListAPI.deleteTodo(id);
          const list = todos.filter(
              (todo: ListTodoName) => todo.id !== id
          );
          setTodos(list);
      }catch (error) {
          console.log(error)
      }
    };

    const handUpdateTodo = async (nameTodo: ListTodoName)=>{
        const list = todos.map((todo) =>{
            if(todo.id === nameTodo.id){
                return {
                    ...nameTodo
                }
            }
            return  todo;
        })
        handleClose();
        try{
            await ListAPI.updateTodo(nameTodo.id,nameTodo);
            setTodos(list);
        }catch (error){
            console.log(error);
        }
    }
    const handleEditTodo = (nameTodo: ListTodoName) => {
        setAvailableTodos(nameTodo);
        setIsModalVisible(true);
    }

    return (
        <div className="App">
            <h2>List todo</h2>
            <div className="header-add-user">
                <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
                    Add New Todo
                </button>
            </div>
            <ListTodo list={todos} deleteTodo={handleDeleteTodo} editTodo={handleEditTodo}/>
            <Modal title="Add Todo" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <AddTodoForm availableTodo={availableTodos} onAddTodo={handleAddItem} onEditTodo={handUpdateTodo} onClose={handleClose}/>
            </Modal>
        </div>
    );
}

export default App;
