import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRight, ChevronDown } from 'lucide-react';
import TaskPopup from '../TaskModal/TaskModal';


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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null); 
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
       
        setSelectedFolder(folder);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFolder(null);
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

{isModalOpen && selectedFolder && (
                <TaskPopup
                    taskId={Date.now().toString()}
                    onClose={closeModal}
                 
                />
            )}
        </div>
    );
};

export default Data;
