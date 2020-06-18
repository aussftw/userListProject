import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions/index';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Typography, Box, Button, Modal, Backdrop, Fade, Container } from '@material-ui/core';
import { CreationUserType } from '../../interfaces/index';
import styled from 'styled-components';
import useStyles from './useStyles';
import Router from 'next/router';

const CreateNewUser: React.FC = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<CreationUserType>({ name: '', surname: '', desc: '' });
  const [open, setOpen] = useState<boolean>(false);

  const classes = useStyles();

  const onSubmit = async () => {
    dispatch(createUser(userData.name, userData.surname, userData.desc));
    setUserData({ name: '', surname: '', desc: '' });
    setOpen(false);
    await Router.push('/');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.container}>
        <ValidatorForm autoComplete="off" onSubmit={onSubmit} noValidate={true}>
          <Typography variant="h5" className={classes.title}>
            Create user
          </Typography>
          <TextValidator
            value={userData.name}
            name="name"
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            onChange={(e: React.ChangeEvent) => handleChange(e)}
            variant="outlined"
            placeholder="Name"
            validators={['required', 'matchRegexp:[^\\s]{3}(.){0,117}']}
            errorMessages={['This field is required', 'Text must be between 3 and 120 characters']}
            className={classes.textField}
          />
          <TextValidator
            value={userData.surname}
            name="surname"
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            onChange={(e: React.ChangeEvent) => handleChange(e)}
            variant="outlined"
            placeholder="Surname"
            validators={['required', 'matchRegexp:[^\\s]{3}(.){0,117}']}
            errorMessages={['This field is required', 'Text must be between 3 and 120 characters']}
            className={classes.textField}
          />
          <TextValidator
            value={userData.desc}
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            onChange={(e: React.ChangeEvent) => handleChange(e)}
            name="desc"
            multiline={true}
            variant="outlined"
            placeholder="Description"
            validators={['required', 'matchRegexp:[^\\s]{3}(.){0,300}']}
            errorMessages={['This field is required', 'Text must be between 3 and 300 characters']}
            className={classes.textField}
            rows={10}
          />
          <Button variant="contained" className={classes.btn} onClick={() => setOpen(true)}>
            Create new user
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            disablePortal
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Container className={classes.paper}>
                <Typography className={classes.modalText}>Are you sure that you want to create this user?</Typography>
                <ButtonsContainer>
                  <Button type="submit" className={classes.modalBtn} onSubmit={onSubmit}>
                    Yes
                  </Button>
                  <Button className={classes.modalBtn} onClick={() => setOpen(false)}>
                    No
                  </Button>
                </ButtonsContainer>
              </Container>
            </Fade>
          </Modal>
        </ValidatorForm>
      </Box>
    </Box>
  );
};

export default CreateNewUser;

const ButtonsContainer = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 992px) {
    width: 50%;
  }
`;
