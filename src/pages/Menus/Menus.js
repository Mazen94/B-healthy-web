import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import ListMenus from '../../components/ListMenus/ListMenus';
import { ADD, MENUS } from '../../shared/strings/strings';
import { PATH_MENU } from '../../routes/path';
import { useStyles } from './styles';
import { CONTAINED, PRIMARY_COLOR } from '../../shared/constants/constants';

export default function Menus() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  /**
   * arrow function to navigate the user to the addPatient page
   */
  const handleClickAjouter = () => {
    history.push(PATH_MENU);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={MENUS} menusProps={true} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Button
            className={classes.ButtonGroup}
            variant={CONTAINED}
            color={PRIMARY_COLOR}
            onClick={handleClickAjouter}
          >
            {ADD}
          </Button>
          {/* Component ListMenus */}
          <ListMenus />
        </Container>
      </main>
    </div>
  );
}
