"use client";
import { useState } from 'react';
import { database, ref, set } from '../lib/firebase'; 

export default function InputPage() {
    const [inputTime, setInputTime] = useState("");
    const [status, setStatus] = useState("None");

    const handleSubmit = () => {
        set(ref(database, 'timer'), {
            time: inputTime
        }).then(() => {
           setStatus("Timer Sent");
        }).catch((error) => {
            setStatus("Failed to send timer");
        });
    };

    const handleTime = (status) => {
        set(ref(database, 'active'), {
            isActive: status
        }).then(() => {
           setStatus(status ? "Timer Started" : "Timer Stopped");
        }).catch((error) => {
            setStatus("Failed to update timer status");
        });
    };

    const clearTimer = () => {
        set(ref(database, 'timer'), {
            timer: 0
        }).then(() => {
           setStatus("Timer Cleared");
        }).catch((error) => {
            setStatus("Failed to update timer status");
        });
    };

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center gap-4'>
            <h1 className='text-3xl'>Set Timer</h1>
            <input
                type="number"
                value={inputTime}
                onChange={(e) => setInputTime(Number(e.target.value))}
                placeholder="Enter timer duration (seconds)"
                className='text-xl text-black p-2 border rounded'
            />
            <div className='flex flex-row w-full gap-4 justify-center'>
                <button onClick={handleSubmit} className='p-2 bg-blue-500 text-white rounded w-20'>
                    Set Timer
                </button>
                <button onClick={() => handleTime(true)} className='p-2 bg-blue-500 text-white rounded w-20'>
                    Start Timer
                </button>
                <button onClick={() => handleTime(false)} className='p-2 bg-blue-500 text-white rounded w-20'>
                    Stop Timer
                </button>
                <button onClick={() => clearTimer()} className='p-2 bg-blue-500 text-white rounded w-20'>
                    Clear
                </button>
            </div>
            <div className='text-lg'>Status: {status}</div>
        </div>
    );
}
