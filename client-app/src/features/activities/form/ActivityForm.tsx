import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "app/common/form/TextInput";
import { TextAreaInput } from "app/common/form/TextAreaInput";

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

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activity/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activity/${activity.id}`)
  //     );
  //   }
  // };

  const handleFinalFormSubmit = (values : any) => {
    console.log(values);
  };


  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  placeholder="Title"
                  name="title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  rows={3}
                  placeholder="Description"
                  name="description"
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  placeholder="Category"
                  name="category"
                  value={activity.category}
                  component={TextInput}

                />
                <Field
                  placeholder="Date"
                  name="date"
                  value={activity.date}
                  component={TextInput}
                />
                <Field
                  placeholder="City"
                  name="city"
                  component={TextInput}
                  value={activity.city}
                />
                <Field
                  placeholder="Venue"
                  name="venue"
                  value={activity.venue}
                  component={TextInput}
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
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
