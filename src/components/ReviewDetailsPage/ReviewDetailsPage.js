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
                {/* park here */}
                <h3>Theodore Wirth Park</h3>
                <div>
                    <p>
                        Theodore Wirth Park is the largest park managed by the Minneapolis Park and Recreation Board.The park land is shared by Minneapolis and the neighboring suburb of Golden Valley.The park includes two golf courses(an 18 - hole course and a 9 - hole par 3 course), Wirth Lake, Birch Pond, and other amenities.It forms a significant portion of the Grand Rounds Scenic Byway, linking the Chain of Lakes area with the Victory Memorial Parkway.
                        {/* review text here */}
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
                <pre>
                    {JSON.stringify(this.props.state.reviewDetails)}
                </pre>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(ReviewDetailsPage);