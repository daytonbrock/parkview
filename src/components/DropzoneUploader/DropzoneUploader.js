// src/components/ImageUpload/ImageUpload.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

// Material-UI components
import Grid from '@material-ui/core/Grid';

import './DropzoneUploader.css';
 
class DropzoneUploader extends Component {
 
    handleFinishedUpload = info => {
        console.log('File uploaded with filename', info.filename)
        console.log('Access it on s3 at', info.fileUrl)
        this.props.dispatch({
            type: 'CAPTURE_IMAGE',
            payload: {
                name: info.filename,
                url: info.fileUrl,
            }
        });
    }
 
    render() {
        const uploadOptions = {
        server: 'http://localhost:5000',
        signingUrlQueryParams: {uploadType: 'avatar'},
        }
        const s3Url = `https://parkviewmplsbucket.s3.amazonaws.com`
    
        return (
            <Grid item xs={3}>
                <DropzoneS3Uploader
                    onFinish={this.handleFinishedUpload}
                    s3Url={s3Url}
                    maxSize={1024 * 1024 * 5}
                    upload={uploadOptions}
                />
            </Grid>
        )
    }
}

export default connect()(DropzoneUploader);