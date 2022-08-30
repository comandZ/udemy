import React, {useState, useEffect} from 'react';
import CardList from '../Components/CardList';
import Scroll from '../Components/Scroll';
import SearchBox from '../Components/SearchBox';
import ErrorBoundry from '../Components/ErrorBoundry';
import Header from '../Components/Header';

function App() {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users));
        console.log(count);
    },[count]); //Only run if object changes
    
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return !robots.length ?
            <h1 className='tc'>Loading...</h1> :
    (
        <div className='tc'>
            <Header/>
            <button onClick={() => setCount(count+1)}>Click Me!</button>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filteredRobots} />
                </ErrorBoundry>
            </Scroll>
        </div>
    );
    
}

export default App;