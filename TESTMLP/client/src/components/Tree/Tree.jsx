import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRight, ChevronDown } from 'lucide-react';


const TaskItem = ({ task }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="task">
            <div className="task-header" onClick={() => setIsOpen(!isOpen)}>
                <button className="toggle-button">
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <p className="task-title">{task?.title}</p>
            </div>
            {isOpen && (
                <div className="task-content">
                    <p className="task-description">{task?.description}</p>
                    {task?.subtasks && task.subtasks.length > 0 && (
                        <div className="subtasks">
                            {task.subtasks.map((subtask, index) => (
                                <TaskItem key={index} task={subtask} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const Folder = ({ item, onAddTask }) => {
    return (
        <div className="folder">
            <div className="folder-header">
                <p className="folder-date">{item?.date}</p>
                <button className="add-task-button" onClick={() => onAddTask(item)}>Add Task</button>
            </div>
            <div className="tasks">
                {item?.tasks?.map((task, index) => (
                    <TaskItem key={index} task={task} />
                ))}
            </div>
        </div>
    );
};

const Data = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'https://raw.githubusercontent.com/UjwalNizzCorp/NizzCorp_MachineTasks/refs/heads/main/flutter_task/api/tasks.json'
            );
            setData(response?.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addTask = (folder) => {
        const newTask = { title: "New Task", description: "New task description", subtasks: [] };
        const updatedData = data.map(item =>
            item.date === folder.date ? { ...item, tasks: [...item.tasks, newTask] } : item
        );
        setData(updatedData);
    };

    return (
        <div className="folder-container">
            {data && data.length > 0 ? (
                <div className="folder-structure">
                    {data.map((item, index) => (
                        <Folder key={index} item={item} onAddTask={addTask} />
                    ))}
                </div>
            ) : (
                <div className="no-data">No data found</div>
            )}
        </div>
    );
};

export default Data;
