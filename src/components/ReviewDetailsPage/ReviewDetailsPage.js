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
                    <Grid item xs={6}>
                        <Button onClick={() => this.props.history.push('/home')}>
                            Edit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(ReviewDetailsPage);