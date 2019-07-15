// src/components/ReviewDetailsPage/ReviewDetailsPage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
                <Grid container spacing={5}>
                    {this.props.state.reviewImages.map( (image, i) => {
                        return (
                            <Grid item xs={12}>
                                {/* <img className="review-image" alt={image.name} src={image.url}/> */}
                                <Card>
                                    <CardMedia component="img"
                                        key={i}
                                        alt={image.name} 
                                        src={image.url}/>
                                </Card>
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