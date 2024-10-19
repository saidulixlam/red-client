import React, { useEffect, useState } from 'react';
import Lane from './Lane';

const Home = () => {
    const [lanes, setLanes] = useState(() => {
        const savedLanes = localStorage.getItem('lanes');
        return savedLanes ? JSON.parse(savedLanes) : [];
    });

    const [subredditInput, setSubredditInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('lanes', JSON.stringify(lanes));
    }, [lanes]);

    const addLane = (subreddit) => {
        setErrorMessage('');

        if (lanes.includes(subreddit.toLowerCase())) {
            setErrorMessage('Subreddit already added');
            return;
        }

        setLanes([...lanes, subreddit.toLowerCase()]);
    };

    const removeLane = (subreddit) => {
        setLanes(lanes.filter((lane) => lane !== subreddit.toLowerCase()));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (subredditInput.trim()) {
            addLane(subredditInput.trim());
            setSubredditInput('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={subredditInput}
                    onChange={(e) => setSubredditInput(e.target.value)}
                    placeholder="Enter subreddit"
                />
                <button type="submit">Add Lane</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <div className="lanes-container">
                {lanes.map((subreddit, index) => (
                    <Lane key={index} subreddit={subreddit} removeLane={removeLane} />
                ))}
            </div>
        </div>
    );
};

export default Home;
