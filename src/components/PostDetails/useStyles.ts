import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  wrapper: {
    margin: '0 1rem',
  },
  header: {
    backgroundColor: '#77A0A9',
    color: '#fff',
    paddingLeft: '2rem',
    textAlign: 'center',
  },
  content: {
    minHeight: '250px',
    paddingTop: '1rem',
    textAlign: 'center',
  },

  text: {
    marginTop: '1rem',
    fontSize: '18px',
  },

  textField: {
    width: '70%',
    marginBottom: '20px',
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#32021F',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#4B2E39',
      },
      '&:hover fieldset': {
        borderColor: '#32021F',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4B2E39',
      },
    },
  },

  btn: {
    marginTop: '1rem',
    letterSpacing: '2px',
    padding: '13px 1rem',
    color: '#fff',
    width: '50%',
    backgroundColor: '#4B2E39',
    '&:hover': {
      backgroundColor: '#32021F',
      color: 'white',
    },
  },
});

export default useStyles;
