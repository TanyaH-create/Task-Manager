//TaskList.tsx

import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

interface TaskListProps {
  initialTasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ initialTasks }) => {
  return (
    <div className="task-list border p-3 rounded">
       {initialTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="list-group">
          {initialTasks.map(task => (
            <li key={task.id} className="list-group-item">
              <h5>{task.title}</h5>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

// export default TaskList;