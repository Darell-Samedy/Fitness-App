import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Header from "../../components/Header";


const CalenderSchedule = () => {
    const theme = useTheme();
    
    const colors = tokens(theme.palette.mode);
   
    const [events, setEvents] = useState([]);


    // ✅ Add Event
    const handleDateClick = (selected) => {
        const title = prompt("Enter event name:");
        if (title) {
            const newEvent = { id: Date.now(), title, start: selected.date };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
        }
    };


    // ✅ Delete Event
    const handleEventClick = (selected) => {
        const confirmDelete = window.confirm(`Delete event: "${selected.event.title}"?`);
        if (confirmDelete) {
            setEvents((prevEvents) => prevEvents.filter(event => event.id !== selected.event.id));
        }
    };


    return (
        <Box m="20px">
            <Header title="Calendar & Schedule" subtitle="Manage your workouts and meal planning" />
           
            <Box
               sx={{
                "& .fc": {
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    borderRadius: "10px",
                },
                "& .fc-toolbar-title": {
                    color: colors.grey[100],
                },
                "& .fc-daygrid-day-number": {
                    color: colors.grey[100],
                },
               }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                />
            </Box>
        </Box>
    );
};


export default CalenderSchedule;