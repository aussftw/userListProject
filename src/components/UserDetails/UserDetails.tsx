import { Typography, Card, CardHeader, CardContent, TextField, Button, IconButton, Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { editUser } from '../../redux/actions/index';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Router from 'next/router';
import useStyles from './useStyles';
import { useState } from 'react';
import DialogComponent from '../common/Dialog/index';
import { CreationUserType } from '../../interfaces/index';

const UserDetails: React.FC = () => {
  const singleUser = useSelector((state: AppStateType) => state.app.singleUser);
  const [userData, setUserData] = useState<CreationUserType>({
    name: singleUser.name,
    surname: '',
    desc: '',
  });

  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const id = singleUser.id;

  const editWrapper = async () => {
    dispatch(editUser(id, userData.name, userData.surname, userData.desc));
    setUserData({ name: '', surname: '', desc: '' });
    await Router.push('/');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  // at leat some validation
  const isEmpty = Object.values(userData).every((x) => x !== null && x !== '');

  return (
    <>
      {singleUser ? (
        <Card className={classes.wrapper}>
          <CardHeader
            title={'User information'}
            className={classes.header}
            action={
              <>
                <IconButton
                  onClick={() => {
                    setActiveEdit(!activeEdit);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpen()}>
                  <DeleteIcon />
                </IconButton>
                <DialogComponent
                  open={open}
                  handleOpen={handleOpen}
                  userId={singleUser.id}
                  name={userData.name}
                  surname={userData.surname}
                  desc={userData.desc}
                  edit={false}
                />
              </>
            }
            style={{ backgroundColor: '#77a0a9' }}
          />
          <CardContent className={classes.content}>
            {activeEdit ? (
              <>
                <Box>
                  <TextField
                    placeholder="Change user name"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    onChange={(e: React.ChangeEvent) => handleChange(e)}
                    name="name"
                    className={classes.textField}
                  />
                  <TextField
                    placeholder="Change user surname"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    onChange={(e: React.ChangeEvent) => handleChange(e)}
                    name="surname"
                    className={classes.textField}
                  />
                  <TextField
                    placeholder="Change user description"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    onChange={(e: React.ChangeEvent) => handleChange(e)}
                    name="desc"
                    className={classes.textField}
                    multiline={true}
                  />
                </Box>
                <Button
                  onClick={() => editWrapper()}
                  variant="contained"
                  className={classes.btn}
                  disabled={isEmpty ? true : false}
                >
                  Edit post
                </Button>
              </>
            ) : (
              <>
                <Box className={classes.textContainer}>
                  <Typography className={classes.text}>
                    {singleUser.name} {singleUser.surname}
                  </Typography>
                </Box>

                <Typography className={classes.desc}>{singleUser.desc}</Typography>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <Typography> Nothing here</Typography>
      )}
    </>
  );
};

export default UserDetails;
