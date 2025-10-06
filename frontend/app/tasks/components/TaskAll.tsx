"use client";

import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/app/mock/tasks";
import { getTasks } from "@/app/services/taskApi";

interface AllTasksListProps {
    selectedUser?: string;
}

export default function AllTasksList({ selectedUser }: AllTasksListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<string>("user");

    const fetchTasks = async (username?: string) => {
        try {
            const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
            const currentRole = currentUser.role || "user";
            setRole(currentRole);

            let data: Task[] = [];

            if (currentRole === "admin") {
                if (selectedUser) {
                    data = await getTasks(selectedUser);
                } else {
                    data = await getTasks(""); 
                }
            } else {
                data = await getTasks(currentUser.username);
            }


            setTasks(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(selectedUser);
    }, [selectedUser]);


    return (
        <div className="p-6 bg-white rounded-2xl shadow-md space-y-4 w-full">
            <h2 className="text-xl font-semibold mb-4 col-span-2">All Tasks</h2>
            {role === "admin" && selectedUser && (
                <span className="text-sm text-gray-500">
                    Viewing: <span className="font-medium text-gray-700">{selectedUser}</span>
                </span>
            )}

            {loading ? (
                <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (

                <div className="flex flex-col items-center justify-center 
                        bg-gray-50 border border-dashed border-gray-300 
                        rounded-lg h-40 text-gray-400 gap-2">
                    <span className="text-sm">No tasks found</span>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {tasks
                        .filter(
                            (task) =>
                                task.status === "PENDING" || task.status === "IN_PROGRESS"
                        )
                        .map((task) => (
                            <TaskCard key={task.id} task={task} imageUrl={task.imageUrl} />
                        ))}
                </div>
            )}
        </div>
    );
}
