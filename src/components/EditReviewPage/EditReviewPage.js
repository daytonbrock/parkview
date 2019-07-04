// src/components/EditReviewPage/EditReviewPage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class EditReviewPage extends Component {

    // local state to hold updates while editting
    state = {
        body: this.props.state.reviewDetails.body, 
    }

    // function that will handle changes to local state
    handleChangeFor = propertyName => event => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        })
    }

    // function that will check if the local state is truthy 
    // dispatch an action to update this review, passing along the local state as payload
    updateReview = () => {
        if (this.props.state.body) {
            this.props.dispatch({ type: 'UPDATE_REVIEW', payload: this.state })
            this.props.history.push('/home'); 
        } else {
            alert('what would you like to say? please leave a comment in the text field.');
        }
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
        return (
            <div className="App">
                <h3>{this.props.state.reviewDetails.park_name}</h3>
                <Grid className="review-content" container>
                    <Grid item xs={12}>
                        <TextField value={this.state.body}
                            fullWidth margin="normal"
                            variant="outlined"
                            multiline rowsMax="15"
                            onChange={this.handleChangeFor('body')}/> 
                    </Grid>
                    {/* After base is met, there will be a upload component here that 
                        will allow the user to attach images to their review.
                    <Grid item xs={6}>
                        <Upload />
                    </Grid> */}
                </Grid>
                <Grid className="page-nav" container>
                    <Grid item xs={6}>
                        <Button onClick={() => this.props.history.push('/home')}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={this.updateReview}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

// needed to access review details from redux store
const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(EditReviewPage);