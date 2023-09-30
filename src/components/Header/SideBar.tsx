import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { List, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ListItem , ListItemIcon, ListItemText, Theme, Drawer, Divider, ListItemButton } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import ListIcon from '@mui/icons-material/List';
import LoopIcon from '@mui/icons-material/Loop';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { TasksContext } from '../TasksProvider';
import { Link } from 'react-router-dom';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginTop: theme.spacing(9)
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginTop: theme.spacing(9)
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  }
}));

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SideBar = ({ isOpen, onClose }: Props) => {
  const { tasks, fetchTasks } = useContext(TasksContext);
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const handleToggleFilter = (isDone: boolean | null) => () => {
    fetchTasks({
      isDone
    });
    console.log(tasks);
  };

  const toggleMenu = () => {
    // if 
  };

  return (
    <Drawer
      open={isOpen}
      onClick={onClose}
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen
        })
      }}
    >
      {/* <div className={classes.toolbar}>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div> */}
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Main" className={classes.link} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      
      <List>
        <Link to="/">
          <ListItem button onClick={handleToggleFilter(null)}>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary={t('statuses.all')} />
          </ListItem>
        </Link>

        <ListItem button onClick={handleToggleFilter(true)}>
          <ListItemIcon><TaskAltIcon /></ListItemIcon>
          <ListItemText primary={t('statuses.done')} />
        </ListItem>

        <ListItem button onClick={handleToggleFilter(false)}>
          <ListItemIcon><LoopIcon /></ListItemIcon>
          <ListItemText primary={t('statuses.progress')} />
        </ListItem>
      </List>
    </Drawer>
  );
};
