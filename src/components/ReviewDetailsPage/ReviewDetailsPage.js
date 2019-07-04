// src/components/ReviewDetailsPage/ReviewDetailsPage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ReviewDetailsPage extends Component {

    // fetch review details based on url id on page load
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
                <Grid className="review-content" container>
                    <Grid item xs={12}>
                        <Typography>
                            {this.props.state.reviewDetails.body}
                        </Typography>
                    </Grid>
                    {/* After base is met, there will be a component here to display review images.
                    <Grid item xs={6}>
                        <ReviewImages />
                    </Grid> */}
                </Grid>
                <Grid className="page-nav" container>
                    { this.props.state.user.id === 1 ? 
                        <>
                            <Grid item xs={4}>
                                <Button onClick={() => {this.props.history.push('/home')}}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={() => {this.props.history.push(`/edit-review/${this.props.state.reviewDetails.id}`)}}>
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

// needed to access review details from redux store
const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(ReviewDetailsPage);