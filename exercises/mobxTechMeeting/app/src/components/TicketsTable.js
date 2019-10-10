import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Paper, Table, TableHead, TableRow, TableCell, LinearProgress, TableBody } from '@material-ui/core';

@inject(({ store }) => ({ ticketsStore: store }))
@observer
class TicketsTable extends React.Component {
  
  render() {
    const { ticketsStore } = this.props;
    const { tickets, status } = ticketsStore;

    return (
      <Grid spacing={16} container style={{padding: '3rem'}}>
        <Grid item xs={12}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Creator</TableCell>
                  <TableCell>Creation Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Body</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {status === 'pending' ? (
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={5}>
                    <LinearProgress style={{width: '100%'}} variant={'query'} />  
                  </TableCell>
                </TableRow>
              ) : (
                tickets.map(ticket => (
                  <TableRow key={ticket._id}>
                    <TableCell component="th" scope="row">
                      {ticket._id}
                    </TableCell>
                    <TableCell>{ticket.user}</TableCell>
                    <TableCell>{ticket.creationDate}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.body}</TableCell>
                  </TableRow>
                ))
              )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default TicketsTable;