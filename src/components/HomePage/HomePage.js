// src/components/HomePage/HomePage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewCard from '../ReviewCard/ReviewCard';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class HomePage extends Component {

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
                        <TextField placeholder="Search by park name"/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(HomePage);