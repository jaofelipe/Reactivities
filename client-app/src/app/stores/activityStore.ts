import { observable, action, computed, configure, runInAction } from 'mobx'
import { createContext, SyntheticEvent } from 'react'
import { IActivity } from '@models/activity'
import axios from '../services/api';

configure({enforceActions: 'always'}) //run in Strict mode

class ActivityStore {
    @observable activityRegistry = new Map()
    @observable loadingInitial = false
    @observable activity: IActivity | null = null
    @observable submitting = false
    @observable target = ''

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await axios.Activities.list();
            runInAction('load activities',() => {
                activities.forEach(activity => {
                    //fixing datatime format 2020-04-28T14:59:00.1306969 for 2020-04-28T14:59:00
                    activity.date = activity.date.split('.')[0]; 
                    this.activityRegistry.set(activity.id,activity)
                })
                this.loadingInitial = false

            })
            
        } catch (error) {
            runInAction('load activities error',() => {
                this.loadingInitial = false

            })
            console.log(error);
        }                   
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity)
        {
            this.activity = activity
            return
        }

        this.loadingInitial = true;
        try {
            activity = await axios.Activities.details(id)
            runInAction('getting activity', () =>{ 
                this.activity = activity
                this.loadingInitial = this.submitting = false
            })
        } catch (error) {
            runInAction('get activity error', () => {
                this.submitting = false
            })
            console.log(error)
        }

    }

    @action clearActivity = () => this.activity = null
        

    getActivity = (id: string) =>{
        return this.activityRegistry.get(id)
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await axios.Activities.create(activity);
            runInAction('creating activity',() => {
                this.activityRegistry.set(activity.id,activity)
                this.submitting = false  
            })
                 
        } catch (error) {
            runInAction('create activity error',() => {
                this.submitting = false
            })
            console.log(error)
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await axios.Activities.update(activity);
            runInAction('editing activity',() => {
                this.activityRegistry.set(activity.id,activity)
                this.activity = activity
                this.submitting = false    
            });   
        } catch (error) {
            runInAction('edit activity error',() => {
                this.submitting = false
            });
            console.log(error)
        }
    }

   

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string ) => {
        this.submitting = true
        this.target = event.currentTarget.name
        try {
            await axios.Activities.delete(id)
            runInAction('delete activity',() => {                
                this.activityRegistry.delete(id)
                this.submitting = false;
                this.target = ''
            });
        } catch (error) {
            runInAction('delete activity error',() => {           
                this.submitting = false;
                this.target = ''
            });
            console.log(error)
        }
    }

    @action selectActivity = (id: string) => {
        this.activity = this.activityRegistry.get(id)  //before observable map this.activities.find(a => a.id === id)
    }
}

export default createContext(new ActivityStore())