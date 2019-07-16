// src/components/ReviewDetailsPage/ReviewDetailsPage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewImages from '../ReviewImages/ReviewImages';
import Swal from 'sweetalert2';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ReviewDetailsPage extends Component {

    // function to delete a review
    // alert to verify user would like to proceed
    deleteReview = () => {
        // prompt user to confirm before deleting
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to recover this review!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                // send confirmation message
                Swal.fire(
                    'Deleted!',
                    'Review removed.',
                    'success'
                )
                // delete review
                this.willDelete();
            }
        });
    }
    
    // when called, will dispatch an action to delete review
    willDelete = () => {
        this.props.dispatch({ 
            type: 'DELETE_REVIEW', 
            payload: this.props.match.params.id,
        });
        this.props.history.push('/home');
    }

    // fetch review details based on url id on page load
    componentDidMount() {
        const reviewId = this.props.match.params.id;
        this.props.dispatch({
            type: 'FETCH_REVIEW_DETAILS',
            payload: reviewId,
        });
    }

    render() {

        const user = this.props.state.user.id;

        return (
            <div className="App">
                <Grid className="page-nav" container>
                    {/* if user is the author of the review or is an admin, show edit and delete buttons */}
                    { user === this.props.state.reviewDetails.user_id ||
                        user === 1 ? 
                        <>
                            <Grid item xs={4}>
                                <Button variant="outlined" onClick={() => {this.props.history.push('/home')}}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="outlined" onClick={() => {this.props.history.push(`/edit-review/${this.props.state.reviewDetails.id}`)}}>
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="outlined" onClick={this.deleteReview}>
                                    Delete
                                </Button>
                            </Grid> 
                        </>
                        :
                        <Grid item xs={12}>
                            <Button variant="outlined" onClick={() => {this.props.history.push('/home')}}>
                                Back
                            </Button>
                        </Grid>
                    }
                </Grid>
                <h3>{this.props.state.reviewDetails.park_name}</h3>
                <Grid className="review-content" container>
                    <Grid item xs={12}>
                        <Typography>
                            {this.props.state.reviewDetails.body}
                        </Typography>
                    </Grid>
                    {/* After base is met, there will be a component here to display review images. */}
                    <ReviewImages review_id={this.props.match.params.id}/>
                </Grid>
                
            </div>
        );
    }
}

// needed to access review details from redux store
const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(ReviewDetailsPage);