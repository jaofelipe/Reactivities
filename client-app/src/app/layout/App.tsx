import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List, Container} from 'semantic-ui-react'
import { IActivity } from '../models/activity'
import axios from '../../services/api';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  useEffect(() => {
      axios.get<IActivity[]>('api/activities').then(response => {
        setActivities(response.data);
      })
  }, []);


  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>     
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
}

export default App;
