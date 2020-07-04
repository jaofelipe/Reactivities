import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IActivity } from '@models/activity'

interface Iprops{
    activity: IActivity;
    setEditMode: (editMode: boolean ) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}


export const ActivityDetails: React.FC<Iprops> = ({activity, setEditMode, setSelectedActivity}) => {
    return (
        <Card>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button.Group widths={2}>
                <Button onClick={() => setEditMode(true)} color='blue' content='Edit'/>
                <Button onClick={() => setSelectedActivity(null)} color='grey' content='Cancel'/>
            </Button.Group>
            </Card.Content>
        </Card>
    )
}
