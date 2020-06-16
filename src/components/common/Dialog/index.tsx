import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteUser } from '../../../redux/actions/index';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import useStyles from './useSstyles';

interface IdialogComponent {
  open: boolean;
  handleOpen: () => void;
  userId?: number;
  name?: string;
  surname?: string;
  desc?: string;
  dialogText?: string;
  edit: boolean;
}

const DialogComponent: React.FC<IdialogComponent> = (props: IdialogComponent) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const deleteUserWrapper = async () => {
    dispatch(deleteUser(props.userId));
    await Router.push('/');
  };

  console.log(props, 'props');

  return (
    <Dialog open={props.open} keepMounted onClose={props.handleOpen}>
      <DialogTitle id="alert-dialog-slide-title">
        {props.edit
          ? 'Are you sure that you want to edit this user?'
          : 'Are you sure that you want to delete this user'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={props.handleOpen} className={classes.modalBtn}>
          Disagree
        </Button>
        <Button
          onClick={() => {
            deleteUserWrapper();
          }}
          className={classes.modalBtn}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
