import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { languagesOptions } from '../../i18n';

export const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('xs'));
  const [ anchorEl, setAnchorEl ] = useState(null);
  const label = useMemo(() => {
    return languagesOptions.find(({ value }) => i18n.language === value)?.label;
  }, [ i18n.language ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const switchLanguage = (lng) => () => {
    i18n.changeLanguage(lng);

    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        size="small"
        color="inherit"
        startIcon={isMobileView ? null : <TranslateOutlinedIcon />}
        endIcon={isMobileView ? null : <ExpandMoreOutlinedIcon />}
        onClick={handleClick}
      >
        {isMobileView ? (
          <>
            <TranslateOutlinedIcon />
            <ExpandMoreOutlinedIcon />
          </>
        ) : label}
      </Button>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        {languagesOptions.map(({ value, label }) => (
          <MenuItem
            key={value}
            selected={i18n.language === value}
            onClick={switchLanguage(value)}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
