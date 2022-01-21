import './ListTodo.css'
import React, { Component }  from 'react';
import {ListTodoName} from "../insterface";
import Item from 'antd/lib/list/Item'


interface ListTodosProps {
    list: ListTodoName[];
    deleteTodo: (id: string) => void;
    editTodo: (nameProduct: ListTodoName) => void;
}

export const ListTodo: React.FC<ListTodosProps> = ({list, deleteTodo , editTodo}) => {
    return <div className="ant-list-items">

            {list.map((item , index) => (
                <div className="ant-list-item">
                    <div className="ant-list-item-meta" key = {index}>
                        <div className="ant-list-item-meta-content">
                            <h4 className="ant-list-item-meta-title">
                                <a>{item.name}</a>
                            </h4>
                            <div className="ant-list-item-meta-description">
                                {item.content}
                            </div>
                        </div>
                        <ul className="ant-list-item-action">
                            <li>
                                <a onClick={()=> editTodo(item)}>Edit</a>
                            </li>
                            <li>
                                <a onClick={()=> deleteTodo(item.id)}>Remove</a>
                            </li>
                        </ul>
                    </div>
                </div>

            ))}

    </div>
}