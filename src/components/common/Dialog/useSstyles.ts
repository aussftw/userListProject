import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  modalBtn: {
    padding: '0.5rem 2rem',
    backgroundColor: '#77a0a9',
    color: '#fff',
    minWidth: '95px',
    '&:hover': {
      backgroundColor: '#6f7d8c',
      color: '#fff',
    },
  },
});

export default useStyles;
