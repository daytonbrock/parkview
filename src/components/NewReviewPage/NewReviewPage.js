// src/components/NewReviewPage/NewReviewPage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import S3Uploader from '../DropzoneUploader/DropzoneUploader';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import './NewReviewPage.css';

class NewReviewPage extends Component {

    // local state to hold review while editing and search input
    state = {
        park_name: 'Select A Park',
        body: '', 
        user_id: this.props.state.user.id || null, 
        search: '',
    }

    // handle input changes
    handleChangeFor = propertyName => event => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        })
    }

    // handles change for search input, 
    // dispatches search on event.target.value
    handleSearch = event => {
        this.setState({
            ...this.state,
            search: event.target.value,
        });
        this.dispatchSearch(event);
    }

    // when called will dispatch a search if search bar value is truthy
    // will fetch all if falsy
    dispatchSearch = (event) => {
        if (event.target.value) {
            this.props.dispatch({
                type: 'SEARCH_PARKS',
                payload: event.target.value,
            });
        } else {
            this.props.dispatch({
                type: 'FETCH_PARKS_DATA'
            });
        }
    }

    // will check park name and body inputs and post a new review if truthy
    addReview = () => {
        if (this.state.park_name !== 'Select A Park' && this.state.body) {
            if (this.props.state.uploadedImages[0]) {
                this.props.dispatch({ 
                    type: 'POST_REVIEW_WITH_IMAGES', 
                    payload: {
                        review: this.state,
                        images: this.props.state.uploadedImages,
                    }
                });
                this.props.history.push('/home');
            } else {
                this.props.dispatch({ type: 'POST_PARK_REVIEW', payload: this.state });
                this.props.dispatch({ type: 'FETCH_ALL_IMAGES' });
                this.props.history.push('/home'); 
            }
        } else {
            alert('please select a park and leave text in your review before posting!')
        }
    }

    cancelReview = () => {
        this.props.dispatch({ type: 'CLEAR_IMAGES' });
        this.props.history.push('/home');
    }

    // will retrieve all parks on page load
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PARKS_DATA' })
    }

    render() {
        return (
            <div className="new-review">
                <Grid container>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={this.cancelReview}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={this.addReview}>
                            Add Review
                        </Button>
                    </Grid>
                </Grid>
                <div className="park_name">
                    { this.state.park_name !== 'Select A Park' ? 
                        <h3>{this.state.park_name}</h3> : null
                    } 
                </div>
                {/* REQUIRED PORTION */}
                <Grid container>
                    {/* PARK SELECT */}
                    <Grid item xs={6}>
                        <TextField placeholder="Search for a park..."
                            value={this.state.search}
                            onChange={this.handleSearch}/>
                    </Grid>    
                    <Grid item xs={6}>    
                        <Select value={this.state.park_name}
                            onChange={this.handleChangeFor('park_name')}>
                            <MenuItem key="default"
                                value="Select A Park"
                                disabled>Select A Park</MenuItem>
                            {this.props.state.parksData.map( park => {
                                if ( park.attributes.PARK_NAME1 !== ' ' && park.attributes.PARK_PARK3 !== ' ') {
                                   return (
                                    <MenuItem key={park.attributes.FID} value={
                                        park.attributes.PARK_NAME1 + ' ' + park.attributes.PARK_PARK3}>
                                        {park.attributes.PARK_NAME1} {park.attributes.PARK_PARK3}
                                    </MenuItem>
                                )};
                            })}
                        </Select>
                    </Grid>
                    {/* BODY OF REVIEW */}
                    <Grid item xs={12}>
                        <Typography>
                            How was your experience?
                        </Typography>
                       <TextField id="outlined-full-width"
                            fullWidth margin="normal"
                            variant="outlined"
                            multiline rowsMax="15"
                            onChange={this.handleChangeFor('body')}/> 
                    </Grid>
                </Grid>
                <br/>
                {/* IMAGES */}
                <Grid container spacing={5}>
                    <Grid item xs={12} className="uploader">
                        <Typography>
                            Upload Images
                        </Typography>
                        <S3Uploader/>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={3}>
                            {this.props.state.uploadedImages.map( (image, i) => {
                                return (
                                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(NewReviewPage);