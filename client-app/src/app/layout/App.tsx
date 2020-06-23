import React, { useState, useEffect, Fragment } from 'react';
import { IActivity } from '../models/activity'
import axios from '../../services/api';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  const handleSelectedActivity = (id : string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }

  useEffect(() => {
      axios.get<IActivity[]>('api/activities').then(response => {
        setActivities(response.data);
      })
  }, []);


  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>     
        <ActivityDashboard 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          activities={activities} />
      </Container>
    </Fragment>
  );
}

export default App;
