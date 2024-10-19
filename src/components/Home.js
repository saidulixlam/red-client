import React, { useEffect, useState } from 'react';
import Lane from './Lane';
import { useGetSubredditPostsQuery } from '../services/redditApi';
import './Home.css';  // Import the CSS file

const Home = () => {
    const [lanes, setLanes] = useState(() => {
        // Load from local storage
        const savedLanes = localStorage.getItem('lanes');
        return savedLanes ? JSON.parse(savedLanes) : [];
    });

    const [subredditInput, setSubredditInput] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Success message state
    const [subredditToAdd, setSubredditToAdd] = useState('');

    // Fetch subreddit data if a new subreddit is being added
    const { data, error: apiError } = useGetSubredditPostsQuery(subredditToAdd, {
        skip: !subredditToAdd, // Skip the query if subredditToAdd is empty
    });

    // Save lanes to local storage on change
    useEffect(() => {
        localStorage.setItem('lanes', JSON.stringify(lanes));
    }, [lanes]);

    const addLane = (subreddit) => {
        // Set the subreddit to add
        setSubredditToAdd(subreddit);
        setError(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success messages
    };

    useEffect(() => {
        if (apiError) {
            setError(`Unable to find subreddit. Please try again.`);
        } else if (data && !lanes.includes(subredditToAdd)) {
            // Add new lane to the top of the list
            setLanes((prevLanes) => [subredditToAdd, ...prevLanes]);
            setSuccessMessage(`Posts from ${subredditToAdd} added successfully!`);
            setSubredditInput(''); // Clear input on successful add
        }
    }, [data, apiError, lanes, subredditToAdd]);

    // Automatically hide the success message after 3 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const removeLane = (subreddit) => {
        setLanes(lanes.filter((lane) => lane !== subreddit));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (subredditInput) {
            addLane(subredditInput);
        }
    };

    return (
        <div className="home-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={subredditInput}
                    onChange={(e) => setSubredditInput(e.target.value)}
                    placeholder="Enter subreddit"
                />
                <button type="submit">Add Lane</button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Success message */}

            <div className="lanes-container">
                {lanes.length > 0 ? (
                    lanes.map((subreddit, index) => (
                        <Lane
                            key={index}
                            subreddit={subreddit}
                            removeLane={removeLane}
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


// import React, { useEffect, useState } from 'react';
// import Lane from './Lane';
// import { useGetSubredditPostsQuery } from '../services/redditApi';
// import './Home.css';  // Import the CSS file

// const Home = () => {
//     const [lanes, setLanes] = useState(() => {
//         // Load from local storage
//         const savedLanes = localStorage.getItem('lanes');
//         return savedLanes ? JSON.parse(savedLanes) : [];
//     });

//     const [subredditInput, setSubredditInput] = useState('');
//     const [error, setError] = useState('');
//     const [subredditToAdd, setSubredditToAdd] = useState('');

//     // Fetch subreddit data if a new subreddit is being added
//     const { data, error: apiError } = useGetSubredditPostsQuery(subredditToAdd, {
//         skip: !subredditToAdd, // Skip the query if subredditToAdd is empty
//     });

//     // Save lanes to local storage on change
//     useEffect(() => {
//         localStorage.setItem('lanes', JSON.stringify(lanes));
//     }, [lanes]);

//     const addLane = (subreddit) => {
//         // Set the subreddit to add
//         setSubredditToAdd(subreddit);
//         setError(''); // Clear previous errors
//     };

//     useEffect(() => {
//         if (apiError) {
//             setError(`Unable to find anything`);
//         } else if (data && !lanes.includes(subredditToAdd)) {
//             setLanes((prevLanes) => [...prevLanes, subredditToAdd]);
//             setSubredditInput(''); // Clear input on successful add
//         }
//     }, [data, apiError, lanes, subredditToAdd]);

//     const removeLane = (subreddit) => {
//         setLanes(lanes.filter((lane) => lane !== subreddit));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (subredditInput) {
//             addLane(subredditInput);
//         }
//     };

//     return (
//         <div className="home-container">
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={subredditInput}
//                     onChange={(e) => setSubredditInput(e.target.value)}
//                     placeholder="Enter subreddit"
//                 />
//                 <button type="submit">Add Lane</button>
//             </form>

//             {error && <p className="error-message">{error}</p>}

//             <div className="lanes-container">
//                 {lanes.length > 0 ? (
//                     lanes.map((subreddit, index) => (
//                         <Lane
//                             key={index}
//                             subreddit={subreddit}
//                             removeLane={removeLane}
//                         />
//                     ))
//                 ) : (
//                     <p>No posts available. Add a subreddit to get started!</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Home;
