import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ListMeeting from '../../components/ListMeeting/ListMeeting';
import MenuBar from '../../components/MenuBar/MenuBar';
import { MEETING_OF_DAY } from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function Meeting() {
  const classes = useStyles(); //add styles to variable classes

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={MEETING_OF_DAY} meetingProps={true} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <ListMeeting />
        </Container>
      </main>
    </div>
  );
}
