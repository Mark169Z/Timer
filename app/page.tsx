"use client";
import { useState, useEffect } from 'react';
import { database, ref, onValue, set } from './lib/firebase'; 

export default function CountdownTimer() {
    const [time, setTime] = useState(0); 
    const [isActive, setIsActive] = useState(false); 

    useEffect(() => {
        const timeRef = ref(database, 'timer');
        const activeRef = ref(database, 'active');

        const unsubscribeTime = onValue(timeRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setTime(data.time || 0);
            }
        });

        const unsubscribeActive = onValue(activeRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setIsActive(data.isActive || false);
            }
        });


        return () => {
            unsubscribeTime();
            unsubscribeActive();
        };
    }, []);

    useEffect(() => {
        set(ref(database, 'timer'), {
            time: 0
        })
        set(ref(database, 'active'), {
            isActive: false
        })
    }, [])

    useEffect(() => {
        let intervalId;
        if (isActive && time > 0) {
            intervalId = setInterval(() => {
                setTime(prevTime => {
                    const newTime = prevTime - 1;
                    if (newTime <= 0) {
                        clearInterval(intervalId);
                    }
                    return newTime;
                });
            }, 1000); 
        }

        return () => clearInterval(intervalId); 
    }, [isActive, time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    useEffect

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='text-7xl'>
                {formatTime(time)}
            </div>
        </div>
    );
}
