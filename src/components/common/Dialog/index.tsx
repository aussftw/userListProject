import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { editUser, deleteUser } from '../../../redux/actions/index';
import { useDispatch } from 'react-redux';

interface IdialogComponent {
  open: boolean;
  handleOpen: () => void;
  userId?: number;
  name?: string;
  surname: string;
  desc?: string;
  dialogText?: string;
  edit: boolean;
}

const DialogComponent: React.FC<IdialogComponent> = (props: IdialogComponent) => {
  console.log(typeof props.userId);
  const dispatch = useDispatch();
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={props.handleOpen}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {props.edit
          ? 'Are you sure that you want to edit this user?'
          : 'Are you sure that you want to delete this user'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={props.handleOpen} color="primary">
          Disagree
        </Button>
        <Button onClick={() => dispatch(editUser(props.userId, props.name, props.surname, props.desc))} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
