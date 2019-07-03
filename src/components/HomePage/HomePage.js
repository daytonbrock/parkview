// src/components/HomePage/HomePage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class HomePage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PARK_REVIEWS' });
    }

    render() {
        return (
            <div className="App">
                <h3>Recent Reviews</h3>
                <Grid container
                    spacing={5}>
                    {this.props.state.reviews.map( review => {
                        return (
                            <Grid item xs={4}
                                key={review.id}>
                                <Card>
                                    <CardContent>
                                        <header>
                                            <h4>{review.park_name}</h4>
                                        </header>
                                        <Typography noWrap>{review.body}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                <br/>
                <br/>
                <Grid container>
                    <Grid item xs={6}>
                        <Button onClick={() => this.props.history.push('/new-review')}>
                            Add A New Review
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField placeholder="Search by park name"/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(HomePage);