// src/components/HomePage/HomePage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewCard from '../ReviewCard/ReviewCard';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class HomePage extends Component {

    // local state to hold search input
    state = {
        search: '',
    }

    // handles change for search input, 
    // loads search on event.target.value
    handleChangeFor = propertyName => event => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        });
        this.loadSearch(event);
    }

    // when called will dispatch a search if search bar value is truthy
    // will fetch all if falsy
    loadSearch = (event) => {
        if (event.target.value) {
            this.props.dispatch({ 
                type: 'SEARCH_PARK_REVIEWS', 
                payload: event.target.value,
            });
        } else {
            this.props.dispatch({
                type: 'FETCH_PARK_REVIEWS'
            });
        }
    }

    // will fetch park reviews on page load
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PARK_REVIEWS' });
    }

    render() {
        return (
            <div className="App">
                <h3>Recent Reviews</h3>
                <Grid container spacing={5}>
                    {this.props.state.reviews.map( review => {
                        return (
                            <ReviewCard key={review.id} 
                                history={this.props.history}
                                review={review}/>
                        );
                    })}
                </Grid>
                <br/>
                <br/>
                <Grid container>
                    <Grid item xs={6}>
                        <Button onClick={() => this.props.history.push('/new-review')}>
                            Add A New Review
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField placeholder="Search by Park Name"
                            value={this.state.search}
                            onChange={this.handleChangeFor('search')}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(HomePage);