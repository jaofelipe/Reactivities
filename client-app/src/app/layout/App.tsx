import React, { useState, useEffect, Fragment } from 'react';
import { IActivity } from '../models/activity'
import axios from '../../services/api';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectedActivity = (id : string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])   
    setEditMode(false)
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }

  const handleCreateActivity = (activity : IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleEditActivity = (activity : IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  useEffect(() => {
      axios.get<IActivity[]>('api/activities').then(response => {
        let activities: IActivity[] = []; //fixing datatime format 2020-04-28T14:59:00.1306969 for 2020-04-28T14:59:00
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(activities);
      })
  }, []);


  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{marginTop: '7em'}}>     
        <ActivityDashboard 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          activities={activities}
          editMode={editMode}
          setEditMode={setEditMode} 
          setSelectedActivity={setSelectedActivity} 
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
