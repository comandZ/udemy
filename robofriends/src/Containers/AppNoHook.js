import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/CardList';
import Scroll from '../Components/Scroll';
import SearchBox from '../Components/SearchBox';
import ErrorBoundry from '../Components/ErrorBoundry';

import { requestRobots, setSearchField } from '../action';
import Header from '../Components/Header';

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return isPending ?
                <h1 className='tc'>Loading...</h1> :
        (
            <div className='tc'>
                <Header />
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);