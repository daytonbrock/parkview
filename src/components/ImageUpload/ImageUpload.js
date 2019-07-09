// src/components/ImageUpload/ImageUpload.js
import React, { Component } from 'react';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';

import './ImageUpload.css';

class ImageUpload extends Component {

    state = {
        file: '',
        filename: 'Choose File',
    }

    handleCapture = event => {
        this.setState({
            file: event.target.files[0],
            filename: event.target.files[0].name,
        });
    }
    
    render() {
        return (
            <Grid item xs={6}>
                <div>
                    <input
                        accept="image/*"
                        className="input"
                        id="icon-button-photo"
                        onChange={this.handleCapture}
                        type="file"
                    />
                    <label htmlFor="icon-button-photo">
                        <IconButton color="primary" component="span">
                            <SvgIcon>
                                <path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"/>
                            </SvgIcon>
                        </IconButton>
                    </label>
                    {/* <Input type="file"/> */}
                </div>
            </Grid>
        );
    }
}

export default ImageUpload;