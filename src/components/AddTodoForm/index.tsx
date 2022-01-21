import React,{useState} from "react";
import { v4 as uuidv4 } from "uuid";
import {ListTodoName} from "../insterface";

interface AddTodoFormProps{
    availableTodo: ListTodoName | null;
    onAddTodo: (nameTodo :ListTodoName) =>void;
    onEditTodo: (nameTodo :ListTodoName) =>void;
    onClose: () =>void;

}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({
                                                                  availableTodo,
                                                                  onAddTodo,
                                                                  onEditTodo,
                                                                  onClose,
                                                              }) => {
    const [inputName, setInputName] = useState(availableTodo?.name || "");
    const [inputContent, setInputContent] = useState(
        availableTodo?.content || ""
    );

    const handleSave = () => {
        if (availableTodo && onEditTodo) {
            onEditTodo({
                id: availableTodo.id,
                name: inputName,
                content: inputContent,
            });
        } else if (onAddTodo) {
            onAddTodo({
                id: uuidv4(),
                name: inputName,
                content: inputContent,
            });
        }
    };
    return <div>
        <div className="field-input-group">
            <input placeholder="Name" type="text" className="ant-input" value={inputName} onChange={(e) => setInputName(e.target.value)} />
        </div>
        <div className="field-input-group">
            <input placeholder="Description" type="text" className="ant-input" value={inputContent} onChange={(e) => setInputContent(e.target.value)}/>
        </div>
        <div className="modal-new-user-footer">
            <button className="ant-btn ant-btn-primary" onClick={handleSave}>
                Save
            </button>
            <button className="ant-btn" style={{marginLeft: 10}} onClick={() => onClose()}>
                Cancel
            </button>
        </div>
    </div>
}
