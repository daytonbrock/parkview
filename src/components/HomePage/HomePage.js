// src/components/HomePage/HomePage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

class HomePage extends Component {
    render() {
        return (
            <div className="App">
                <h3>Recent Reviews</h3>
                <Grid container
                    spacing={5}>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <header>
                                    <h4>Theodore Wirth Park</h4>
                                </header>
                                <p>snippet of review text...</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <header>
                                    <h4>Bryn Mawr Meadows</h4>
                                </header>
                                <p>snippet of review text...</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <header>
                                    <h4>Clinton Field Park</h4>
                                </header>
                                <p>snippet of review text...</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <header>
                                    <h4>Elliot Park</h4>
                                </header>
                                <p>snippet of review text...</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <header>
                                    <h4>Mueller Park</h4>
                                </header>
                                <p>snippet of review text...</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <header>
                                    <h4>Powderhorn Park</h4>
                                </header>
                                <p>snippet of review text...</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* map through actual reviews */}
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

export default connect()(HomePage);