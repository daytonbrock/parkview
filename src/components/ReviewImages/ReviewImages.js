// src/components/ReviewDetailsPage/ReviewDetailsPage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class ReviewImages extends Component {

    // fetch review images based on review id on page load
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_REVIEW_IMAGES',
            payload: this.props.review_id,
        });
    }

    render() {
        return (
            <div className="App">
                <Grid container>
                    {this.props.state.reviewImages.map( image => {
                        return (
                            <Grid item xs={12}>
                                <img alt={image.name} src={image.url}/>
                            </Grid>
                        );
                    })}

                </Grid>
            </div>
        );
    }
}

// needed to access review details from redux store
const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(ReviewImages);