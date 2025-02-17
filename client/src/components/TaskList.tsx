import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap'; // Import Bootstrap Carousel

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
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect screen size

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  // Update isMobile when window resizes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container className={`task-list-container mt-4 ${isMobile ? 'mobile-caraousel' : ''}`}>
      {taskList.length === 0 ? (
        <p>No tasks available.</p>
      ) : isMobile ? (
        // MOBILE VIEW - Use Bootstrap Carousel
        <Carousel interval={null} indicators={false}>
          {taskList.map((task) => (
            <Carousel.Item key={task.id}>
              <Card className="shadow-sm p-3">
                <TaskItem task={task} onToggleComplete={onToggleComplete} />
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        // DESKTOP VIEW - Grid Layout
        <Row>
          {taskList.map((task) => (
            <Col key={task.id} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow-sm">
                <TaskItem task={task} onToggleComplete={onToggleComplete} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TaskList;
