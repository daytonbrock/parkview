import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class ReviewCard extends Component {
    render() {
        return (
            <Grid item xs={4}>
                <Card onClick={() => this.props.history.push(`/review-details/${this.props.review.id}`)}>
                    <CardContent>
                        <header>
                            <h4>{this.props.review.park_name}</h4>
                        </header>
                        <Typography noWrap>{this.props.review.body}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default connect()(ReviewCard);