import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class ReviewCard extends Component {

    render() {

        const foundImage = this.props.state.allImages.find(image => image.review_id === this.props.review.id);

        return (
            <Grid item xs={4}>
                <Card onClick={() => this.props.history.push(`/review-details/${this.props.review.id}`)}>
                    { foundImage ? 
                        <CardMedia component="img"
                            height="250"
                            alt={foundImage.name} 
                            src={foundImage.url}/> 
                        : null 
                    }
                    <CardContent>
                        <Typography variant="h6" gutterBottom component="h3">{this.props.review.park_name}</Typography>
                        <Typography variant="body2" component="p" noWrap>{this.props.review.body}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(ReviewCard);