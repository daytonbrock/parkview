// src/components/NewReviewPage/NewReviewPage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class NewReviewPage extends Component {

    // local state to hold review while editing and search input
    state = {
        park_name: '',
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
        if (this.state.park_name && this.state.body) {
            this.props.dispatch({ type: 'POST_PARK_REVIEW', payload: this.state })
            this.props.history.push('/home'); 
        } else {
            alert('please select a park and leave text in your review before posting!')
        }
    }

    // will retrieve all parks on page load
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PARKS_DATA' })
    }

    render() {
        return (
            <div className="App">
                { this.state.park_name ? 
                    <h3>{this.state.park_name}</h3> :
                    <h3>Select a park to review</h3>
                }
                <Grid container>
                    <Grid item xs={6}>
                        <TextField placeholder="Search for a park..."
                            value={this.state.search}
                            onChange={this.handleSearch}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Select value={this.state.park_name}
                            onChange={this.handleChangeFor('park_name')}>
                            {this.props.state.parksData.map( park => {
                                return (
                                    <MenuItem key={park.attributes.FID} value={
                                        park.attributes.PARK_NAME1 + ' ' + park.attributes.PARK_PARK3
                                    }>
                                        {park.attributes.PARK_NAME1} {park.attributes.PARK_PARK3}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Grid>
                </Grid>
                <TextField id="outlined-full-width"
                    fullWidth margin="normal"
                    variant="outlined"
                    multiline rowsMax="15"
                    onChange={this.handleChangeFor('body')}/>
                {/* After base is met, there will be a upload file component here */}
                <Grid container>
                    <Grid item xs={6}>
                        <Button onClick={() => this.props.history.push('/home')}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={this.addReview}>
                            Add Review
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(NewReviewPage);