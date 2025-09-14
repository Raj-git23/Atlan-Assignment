import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import DraggableActivity from '../unscheduled-activity';
import { Coffee, Plus, Utensils } from 'lucide-react';

const Unscheduled = ({ schedule }) => {
  
  const getUnscheduledActivities = () => [
  {
    id: 1,
    name: "Morning Brunch",
    category: "food",
    icon: Coffee,
    duration: "2h",
    mood: "relaxed",
    description: "Cozy breakfast spot with amazing pancakes and fresh coffee",
    price: "$$",
  },
  {
    id: 2,
    name: "Dinner Date",
    category: "food",
    icon: Utensils,
    duration: "2h",
    mood: "romantic",
    description: "Fine dining at that new restaurant downtown",
    price: "$$$",
  },
];


  return (
    <Card className='w-2/3 h-96 hover:shadow-lg transition-all duration-300'>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Unscheduled Activities ({getUnscheduledActivities().length})
        </CardTitle>

        <CardDescription>Plan your activities for the week</CardDescription>
      
      </CardHeader>
      
      <CardContent className='h-full flex items-center justify-center'>
        {/* <p>No activities scheduled</p> */}
        <DraggableActivity getUnscheduledActivities={getUnscheduledActivities} />
      
      </CardContent>
    </Card>
  )
}

export default Unscheduled