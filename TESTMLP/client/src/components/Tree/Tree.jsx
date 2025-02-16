import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRight, ChevronDown } from 'lucide-react';
import io from 'socket.io-client';
import TaskModal from '../TaskModal/TaskModal';
import { useNavigate } from 'react-router';
const socket = io('http://localhost:8000');
const TaskItem = ({ task, onAddSubtask }) => {
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
                                <TaskItem key={index} task={subtask} onAddSubtask={onAddSubtask} />
                            ))}
                        </div>
                    )}
                    <button className="add-subtask-button" onClick={() => onAddSubtask(task)}>
                        Add task
                    </button>
                </div>
            )}
        </div>
    );
};



const Folder = ({ item, onAddTask, isModalOpen, closeModal, selectedTask }) => {
    return (
        <div className="folder">
            <div className="folder-header">
                <p className="folder-date">{item?.date}</p>
            </div>
            <div className="tasks">
                {item?.tasks?.map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        onAddSubtask={onAddTask}
                    />
                ))}
            </div>

            {isModalOpen && selectedTask && (
                <TaskModal
                    taskId={selectedTask?.taskId}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

const Data = () => {

    useEffect(() => {
        socket.on('taskAdded', (data) => {
            alert(data.message)
        });

        return () => {
            socket.off('taskAdded');
        };
    }, []);


    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
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

    const addSubtask = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };
    const filteredData = data.filter((item) => {
        return item?.tasks?.some((task) => {
            return (
                task?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task?.description?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })
    })
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };
    const navigate = useNavigate()
    return (
        <div>

            <div className='main_head'>
                <button className="btn_style" onClick={() => navigate("/task")}>Click here to go to all Task</button>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="folder-container">
                {filteredData && filteredData.length > 0 ? (
                    <div className="folder-structure">
                        {filteredData.map((item, index) => (
                            <Folder
                                key={index}
                                item={item}
                                onAddTask={addSubtask}
                                isModalOpen={isModalOpen}
                                closeModal={closeModal}
                                selectedTask={selectedTask}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-data">No data found</div>
                )}
            </div>
        </div>
    );
};

export default Data;
