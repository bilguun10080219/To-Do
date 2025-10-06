"use client";

import { useEffect, useState } from "react";
import { Task, Priority, Status } from "@/app/mock/tasks";
import { createTask, uploadFile } from "@/app/services/taskApi";

interface AddTaskProps {
    onClose: () => void;
}

export default function AddTask({ onClose }: AddTaskProps) {
    const [title, setTitle] = useState("");
    const today = new Date().toISOString().split("T")[0];
    const [createdDate, setCreatedDate] = useState(today);
    const [priority, setPriority] = useState<Priority>("Low");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [status] = useState<Status>("PENDING");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("user");

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const parsed = JSON.parse(user);
            setRole(parsed.role || "user");
        }
    }, []);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const role = currentUser.role || "user";
        const assignedUser =
            role === "admin"
                ? (document.getElementById("assignedUser") as HTMLSelectElement)?.value
                : currentUser.username;

        setLoading(true);
        try {
            if (role === "admin" && !assignedUser) {
                alert("Please select a user to assign this task to!");
                setLoading(false);
                return;
            }

            let imageUrl:string | undefined = undefined;

            if (image) {
                imageUrl = await uploadFile(image);
            }

            const newTask: Partial<Task> = {
                name: title,
                createdDate,
                status,
                priority,
                description,
                username: assignedUser, 
                imageUrl,
            };

            await createTask(newTask);
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to add task");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="bg-[#F9F9F9] w-[918px] h-[708px] rounded-md border border-gray-300 shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="h-full flex flex-col space-y-6">

                <div className="flex justify-between items-center pb-2">
                    <h2 className="text-xl font-bold text-gray-800">Add Task</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm text-gray-600 hover:underline"
                    >
                        ✕
                    </button>
                </div>


                <div className="bg-[#FFFFFF] w-[794px] h-[476px] rounded-lg border border-gray-200 shadow p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            value={createdDate}
                            onChange={(e) => setCreatedDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div className="flex gap-24">
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">
                                Priority
                            </label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="Extremely"
                                        checked={priority === "Extremely"}
                                        onChange={() => setPriority("Extremely")}
                                    />
                                    <span className="text-red-600">Extreme</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="Moderate"
                                        checked={priority === "Moderate"}
                                        onChange={() => setPriority("Moderate")}
                                    />
                                    <span className="text-blue-600">Moderate</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="Low"
                                        checked={priority === "Low"}
                                        onChange={() => setPriority("Low")}
                                    />
                                    <span className="text-green-600">Low</span>
                                </label>
                            </div>
                        </div>

                        {role === "admin" && (
                            <div>
                                <label className="block text-sm font-bold text-gray-600 mb-2">
                                    Assign to User
                                </label>
                                <select
                                    id="assignedUser"
                                    className="w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                                    defaultValue=""
                                >

                                    <option value="">Select a user...</option>
                                    {/*  Энд backend
                                            {users.map((u) => (
                                            <option key={u.username} value={u.username}>
                                    {u.username}
                                          </option>
                                      ))} */}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 flex-1">
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1">
                                Task Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Start writing here..."
                                className="w-full border border-gray-300 rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1">
                                Upload Image
                            </label>
                            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 text-gray-400">
                                {image ? (
                                    <p>{image.name}</p>
                                ) : (
                                    <>
                                        <p>Drag & Drop files here</p>
                                        <span className="my-2">or</span>
                                        <input
                                            type="file"
                                            onChange={(e) =>
                                                setImage(e.target.files ? e.target.files[0] : null)
                                            }
                                            className="hidden"
                                            id="fileUpload"
                                        />
                                        <label
                                            htmlFor="fileUpload"
                                            className="cursor-pointer bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                        >
                                            Browse
                                        </label>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex justify-start pt-4">
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600" disabled={loading}
                    >
                        {loading ? "Uploading..." : "Save" }
                    </button>
                </div>
            </form>
        </div>
    );
}
