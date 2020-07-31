import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface Form {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<Form>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);

  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
    activity: initialFormState,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      //only to create new activity
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }

    //equals to componentWillUnmount
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match,
    initialFormState,
    activity.id.length,
  ]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activity/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activity/${activity.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              placeholder="Title"
              onChange={handleInputChange}
              name="title"
              value={activity.title}
            />
            <Form.TextArea
              rows={2}
              placeholder="Description"
              onChange={handleInputChange}
              name="description"
              value={activity.description}
            />
            <Form.Input
              placeholder="Category"
              onChange={handleInputChange}
              name="category"
              value={activity.category}
            />
            <Form.Input
              type="datetime-local"
              placeholder="Date"
              onChange={handleInputChange}
              name="date"
              value={activity.date}
            />
            <Form.Input
              placeholder="City"
              onChange={handleInputChange}
              name="city"
              value={activity.city}
            />
            <Form.Input
              placeholder="Venue"
              onChange={handleInputChange}
              name="venue"
              value={activity.venue}
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="button"
              content="Submit"
            />
            <Button
              onClick={() => history.push("/activities")}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
