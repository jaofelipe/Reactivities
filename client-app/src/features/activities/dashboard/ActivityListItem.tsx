import React, { useContext } from "react";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from 'date-fns'
import { IActivity } from "@models/activity";
import { RootStoreContext } from "app/stores/rootStore";

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { target, submitting, deleteActivity } = rootStore.activityStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Description>Hosted By Bob</Item.Description>
              <Item.Meta>{format(activity.date, 'h:mm a')}</Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>

        <Segment>
          <Icon name="clock" /> {format(activity.date, 'h:mm a')}
          <Icon name="marker" /> {activity.venue}, {activity.city}
        </Segment>
        <Segment clearing>
          <span>{activity.description}</span>
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            floated="right"
            content="View"
            color="blue"
          />
          <Button
            name={activity.id}
            loading={target === activity.id && submitting}
            onClick={(e) => deleteActivity(e, activity.id)}
            floated="right"
            content="Delete"
            color="red"
          />
          <Label basic content={activity.category} />
        </Segment>
      </Segment>
    </Segment.Group>
  );
};
