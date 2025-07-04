import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  stickerUrl?: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number, updatedTask: Task) => void;
  onDeleteTask: (taskId: number) => void;  // Ensure onDeleteTask is included here
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDeleteTask }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleDeleteTask = (taskId: number) => {
    console.log('TASK LIST: handleDeleteTask, id:', taskId) 
    // Update task list state to trigger a re-render
    //Call the parent method to handle deleteion
    onDeleteTask(taskId);
    //
    // const updatedTasks = taskList.filter((task) => task.id !== taskId);
    // console.log('UPDATED TASK:', updatedTasks)
    // setTaskList(updatedTasks);
  };

  return (
    <Container className="task-list-container mt-4 w-100 h-auto">
      {taskList.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <Row>
          {taskList.map((task) => (
            <Col key={task.id} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow-sm">
                <TaskItem task={task} onToggleComplete={onToggleComplete} onDeleteTask={handleDeleteTask}/>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TaskList;