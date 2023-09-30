import { makeStyles } from '@mui/styles';
import { PropsWithChildren } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default
  },
  main: {
    width: '70%'
  }
}));

export const Layout = ({ children }: PropsWithChildren) => {
  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        {children}
      </div>
    </div>
  );
};

