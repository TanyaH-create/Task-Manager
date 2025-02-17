import React from "react";
import { Button } from "react-bootstrap"; // Import Button from React-Bootstrap

interface AddTaskButtonProps {
  onAddTask: () => void; // Function passed as a prop
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onAddTask }) => {
  return (
    <Button variant="primary" onClick={onAddTask}> 
      + Add Task
    </Button>
  );
};

export default AddTaskButton;
