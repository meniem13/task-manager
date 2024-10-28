"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  RootState,
  Task,
  TaskImportance,
  TaskState,
} from "../../lib/store"; // Adjust path if necessary
import { addTask } from "../../lib/store";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, Suspense, useState } from "react";

const Page = () => {
  const params = useSearchParams();
  const userName = params.get("userName");
  const dispatch = useDispatch();
  const [taskModalVisible, setTaskModalVisible] = useState(false); // New state for the create task modal
  const [photoUrl, setPhotoUrl] = useState("");
  const [CurrShowingTask, setsetCurrShowingTask] = useState<Task>();
  const [togleshowingTask, setTogleshowingTask] = useState(true);

  const [newTaskTitle, setNewTaskTitle] = useState(""); // State for the new task title
  const [newTaskDescription, setNewTaskDescription] = useState(""); // State for the new task description
  const [newTaskImportance, setNewTaskImportance] = useState<TaskImportance>(
    TaskImportance.Mid
  ); // State for task importance

  const tasks = useSelector((state: RootState) => state.tasks);

  const createNewTask = () => {
    const newTask = {
      id: Date.now(), // Generate a unique ID
      title: newTaskTitle,
      photoUrl: photoUrl, // Add a default photo URL if needed
      description: newTaskDescription,
      state: TaskState.ToDo,
      importance: newTaskImportance,
      completed: false,
    };
    dispatch(addTask(newTask)); // Dispatch the action to add a new task
    resetTaskModal(); // Reset the modal fields after creating a new task
  };
  const deleteTaskk = (id: number) => {
    dispatch(deleteTask(id)); // Dispatch the action to add a new task
  };

  const resetTaskModal = () => {
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskImportance(TaskImportance.Mid); // Reset to default importance
    setTaskModalVisible(false); // Close the modal
  };
  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  console.log(
    "all the tasks iddss",
    tasks.map((task) => task.id)
  );

  return (
    <div className="w-screen h-screen bg-slate-400 overflow-y-scroll overflow-x-hidden relative">
      <div className="w-4/5 h-full bg-slate-200 shadow-md mx-auto p-6">
        <h1 className="text-4xl mx-auto text-center py-11">
          Welcome <span className="underline font-semibold">{userName}</span>
        </h1>
        <div>
          <div className="flex justify-between items-center ">
            <h2 className="text-2xl py-5">Your tasks for today</h2>
            <button
              className="px-5 py-2 h-10 rounded-lg bg-blue-500 text-white font-semibold mr-14"
              onClick={() => setTaskModalVisible(true)} // Open the task creation modal
            >
              Create New Task
            </button>
          </div>
          <div className="grid grid-cols-4 gap-x-3">
            {tasks.length === 0
              ? //   <div className="fixed inset-0 text-5xl text-slate-600 flex justify-center items-center">
                " No tasks yet"
              : //   </div>
                tasks.map((task) => (
                  <div
                    className="w-60 h-28 rounded-lg shadow-md border border-slate-300 cursor-pointer flex justify-center items-center gap-4 my-2"
                    key={task.id}
                    onClick={() => {
                      setsetCurrShowingTask(task);
                      setTogleshowingTask(true);
                    }}
                  >
                    <div className="font-semibold text-xl text-slate-700">
                      {task.title}
                    </div>
                  </div>
                ))}
          </div>

          {/* Task Creation Modal */}
          {taskModalVisible && (
            <div className="fixed inset-0 flex items-center justify-center z-40 backdrop-blur-sm bg-slate-100 bg-opacity-10">
              <div className="p-6 rounded-lg shadow-lg bg-white w-1/2 h-2/3 flex relative">
                <p
                  className="font-bold text-3xl cursor-pointer absolute top-1 right-4 hover:shadow-lg p-2 rounded-full"
                  onClick={resetTaskModal} // Close the modal
                >
                  x
                </p>
                <div className="flex flex-col justify-center items-center w-full h-full">
                  <h2 className="text-3xl font-semibold mb-4">
                    Create New Task
                  </h2>
                  <input
                    type="text"
                    placeholder="Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded mb-4 w-1/2 mt-4"
                  />
                  <input
                    type="file"
                    onChange={handlePhoto}
                    className="block mb-4"
                    accept="image/*"
                  />
                  <textarea
                    placeholder="Task Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="border border-gray-300 p-2 rounded mb-4 w-1/2"
                  />
                  <div className="flex justify-center items-center w-1/2 ">
                    <p className="">select task priority</p>

                    <select
                      value={newTaskImportance}
                      onChange={(e) =>
                        setNewTaskImportance(e.target.value as TaskImportance)
                      }
                      className="border border-gray-300 p-2 rounded mb-4 w-full"
                    >
                      <option value={TaskImportance.Low}>Low</option>
                      <option value={TaskImportance.Mid}>Mid</option>
                      <option value={TaskImportance.High}>High</option>
                    </select>
                  </div>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={createNewTask} // Create the task
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Task Details Modal */}
          {togleshowingTask && CurrShowingTask && (
            <div className="fixed inset-0 flex items-center justify-center z-40 backdrop-blur-sm bg-slate-100 bg-opacity-10">
              <div className="p-6 rounded-lg shadow-lg bg-white w-1/2 h-2/3 flex relative">
                <p
                  className="font-bold text-3xl cursor-pointer absolute top-1 right-4 hover:shadow-lg p-2 rounded-full"
                  onClick={() => setTogleshowingTask(false)}
                >
                  x
                </p>
                <div className="w-1/2 h-full">
                  <img
                    src={CurrShowingTask.photoUrl}
                    className="w-full h-full object-fill"
                    alt=""
                  />
                </div>
                <div className="flex-1 flex flex-col justify- py-7 gap-y-5 items-center">
                  <h2 className="text-3xl font-semibold">
                    {CurrShowingTask.title}
                  </h2>
                  <p className="mt-2 text-lg">{CurrShowingTask.description}</p>
                  <div>
                    completed:{" "}
                    {CurrShowingTask.completed ? "completed" : "not yet"}
                  </div>
                  <div>current state: {CurrShowingTask.state}</div>
                  <div>task priority: {CurrShowingTask.importance}</div>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => {
                      deleteTaskk(CurrShowingTask.id);
                      setTogleshowingTask(false);
                      console.log(tasks.map((task) => task.id));
                    }} // To close the modal
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Wrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
};

export default Wrapper;
