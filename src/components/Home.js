import React, { useState ,useEffect} from 'react';
import Lane from './Lane';
import { useGetSubredditPostsQuery } from '../services/redditApi';
import './Home.css'; 

const Home = () => {
    const [lanes, setLanes] = useState(() => {
        const savedLanes = localStorage.getItem('lanes');
        return savedLanes ? JSON.parse(savedLanes) : [];
    });

    const [subredditInput, setSubredditInput] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const [subredditToAdd, setSubredditToAdd] = useState('');

    const { data, error: apiError, isFetching } = useGetSubredditPostsQuery(subredditToAdd, {
        skip: !subredditToAdd,
    });
    const saveLanesToLocalStorage = (lanes) => {
        localStorage.setItem('lanes', JSON.stringify(lanes));
    };

    const addLane = () => {
        setError('');
        setSuccessMessage('');
        if (!subredditInput) {
            setError('Please enter a subreddit.');
            return;
        }

        if (lanes.includes(subredditInput.toLowerCase())) {
            setError(`Subreddit "${subredditInput}" is already added.`);
            return;
        }

        setSubredditToAdd(subredditInput.toLowerCase());
    };

    if (!isFetching && subredditToAdd && !lanes.includes(subredditToAdd)) {
        if (apiError) {
            setError(`Unable to find subreddit "${subredditToAdd}". Please try again.`);
        } else if (data) {
            setLanes((prevLanes) => {
                const newLanes = [subredditToAdd, ...prevLanes];
                saveLanesToLocalStorage(newLanes);
                setSubredditInput(' ');
                return newLanes;
            });
            setSuccessMessage(`Posts from ${subredditToAdd} added successfully!`);
        }

        setSubredditToAdd('');
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setSuccessMessage('');
        }, 2000);

        return () => clearTimeout(timer);
    }, [error, successMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addLane();
    };

    return (
        <div className="home-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={subredditInput}
                    onChange={(e) => setSubredditInput(e.target.value)}
                    placeholder="Enter subreddit"
                    required
                />
                <button type="submit" disabled={isFetching}>
                    {isFetching ? 'Adding...' : 'Add Lane'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="lanes-container">
                {lanes.length > 0 ? (
                    lanes.map((subreddit, index) => (
                        <Lane
                            key={index}
                            subreddit={subreddit}
                            removeLane={() => {
                                setLanes(lanes.filter((lane) => lane !== subreddit));
                                saveLanesToLocalStorage(lanes.filter((lane) => lane !== subreddit));
                            }}
                        />
                    ))
                ) : (
                    <p>No posts available. Add a subreddit to get started!</p>
                )}
            </div>
        </div>
    );
};

export default Home;
