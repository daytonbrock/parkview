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
        selectedPark: '',
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        })
    }

    render() {
        return (
            <div className="App">
                { this.state.selectedPark ? 
                    <h3>{this.state.selectedPark}</h3> :
                    <h3>Select a park to review</h3>
                }
                {/* Selected Park should append here */}
                <Grid container>
                    <Grid item xs={6}>
                        <TextField placeholder="Search for a park..."/>
                        {/* Re-render select menu options based on search bar */}
                    </Grid>
                    <Grid item xs={6}>
                        <Select value={this.state.selectedPark}
                            onChange={this.handleChangeFor('selectedPark')}>
                            <MenuItem value="Mueller Park">Mueller Park</MenuItem>
                            <MenuItem value="Powderhorn Park">Powderhorn Park</MenuItem>
                            <MenuItem value="Elliot Park">Elliot Park</MenuItem>
                            <MenuItem value="Theodore Wirth Park">Theodore Wirth Park</MenuItem>
                            <MenuItem value="Bryn Mawr Meadows">Bryn Mawr Meadows</MenuItem>
                            <MenuItem value="Clinton Field Park">Clinton Field Park</MenuItem>
                            {/* Get parks from API to display here */}
                        </Select>
                    </Grid>
                </Grid>
                <TextField id="outlined-full-width"
                    fullWidth margin="normal"
                    variant="outlined"
                    multiline rowsMax="15"/>
                {/* After base is met, there will be a upload file component here */}
                <Grid container>
                    <Grid item xs={6}>
                        <Button onClick={() => this.props.history.push('/home')}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button>
                            Add Review
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

// will need to retrieve parks from redux store
// will need to communicate / make queries onChange of search bar
const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(NewReviewPage);