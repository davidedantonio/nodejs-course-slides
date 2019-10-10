import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import TicketsTable from './components/TicketsTable';
import { IconButton, Snackbar } from '@material-ui/core';
import Refresh from '@material-ui/icons/RefreshRounded';
import Add from '@material-ui/icons/AddCircleOutline';
import AddTicket from './components/AddTicket';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = withStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

@inject('store')
@observer
class App extends React.Component {

  render () {
    const { classes, store } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Tickets
            </Typography>
            <IconButton 
              color="inherit"
              onClick={_ => store.listTickets()}
              ><Refresh /></IconButton>
            <IconButton 
              color={'inherit'}
              onClick={_ => store.openCloseAdd()}
              ><Add /></IconButton>
          </Toolbar>
        </AppBar>

        <TicketsTable />
        <AddTicket />
        
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={store.error}
          autoHideDuration={6000}
          onClose={store.closeError}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{store.error}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={store.closeError}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default useStyles(App);
