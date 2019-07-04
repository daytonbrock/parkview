// src/components/ReviewDetailsPage/ReviewDetailsPage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class ReviewDetailsPage extends Component {

    componentDidMount() {
        const reviewId = this.props.match.params.id;
        this.props.dispatch({
            type: 'FETCH_REVIEW_DETAILS',
            payload: reviewId,
        });
    }

    render() {
        return (
            <div className="App">
                <h3>{this.props.state.reviewDetails.park_name}</h3>
                <div>
                    <p>
                        {this.props.state.reviewDetails.body}
                    </p>
                </div>
                <Grid container>
                    { this.props.state.user.id === 1 ? 
                        <>
                            <Grid item xs={4}>
                                <Button onClick={() => {this.props.history.push('/home')}}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button>
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button>
                                    Delete
                                </Button>
                            </Grid> 
                        </>
                        :
                        <Grid item xs={12}>
                            <Button onClick={() => {this.props.history.push('/home')}}>
                                Back
                            </Button>
                        </Grid>
                    }
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(ReviewDetailsPage);