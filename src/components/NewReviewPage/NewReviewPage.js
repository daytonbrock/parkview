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

    state = {
        park_name: '',
        body: '', 
        user_id: null, 
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        })
    }

    // LOOK INTO FORMATTING PARK NAMES SO THEY ARE NOT ALL CAPS
    // capitalizeFirstLetter(string) {
    //     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    // }

    addReview = () => {
        if (this.state.park_name && this.state.body) {
            this.props.dispatch({ type: 'POST_PARK_REVIEW', payload: this.state })
            this.props.history.push('/home'); 
        } else {
            alert('please select a park and leave text in your review before posting!')
        }
    }

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
                        <TextField placeholder="Search for a park..."/>
                        {/* Re-render select menu options based on search bar */}
                    </Grid>
                    <Grid item xs={6}>
                        <Select value={this.state.park_name}
                            onChange={this.handleChangeFor('park_name')}>
                            {this.props.state.parksData.map( park => {
                                return (
                                    <MenuItem key={park.properties.FID} value={
                                        park.properties.PARK_NAME1 + ' ' + park.properties.PARK_PARK3
                                    }>
                                        {park.properties.PARK_NAME1} {park.properties.PARK_PARK3}
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
                <pre>
                    {JSON.stringify(this.props.state, null, 2)}
                </pre>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(NewReviewPage);