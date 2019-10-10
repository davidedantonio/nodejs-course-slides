import React from 'react';
import { inject, observer } from 'mobx-react';
import { Dialog, Grid, TextField, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

@inject(({ store }) => ({ ticketsStore: store }))
@observer
class AddTicket extends React.Component {
  state = {
    title: '',
    body: ''
  };
  
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { ticketsStore } = this.props;
    const { openAdd, openCloseAdd, addTicket } = ticketsStore;

    return (
      <Dialog open={openAdd} onClose={openCloseAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please insert the ticket information
          </DialogContentText>
          <Grid spacing={16} container>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Title"
                variant={'outlined'}
                onChange={this.handleChange('title')}
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} style={{paddingTop: 20}}>
              <TextField
                id="message"
                label="Message"
                multiline
                rowsMax="4"
                variant={'outlined'}
                margin="normal"
                onChange={this.handleChange('body')}
                fullWidth={true}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={openCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={_ => addTicket(this.state)} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AddTicket;