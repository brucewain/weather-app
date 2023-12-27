import { useState } from "react";

// Convets dt time to 24 hours
export function convertUnixTimestampToHours(unixTimestamp) {
  // Convert Unix timestamp to milliseconds by multiplying by 1000
  const milliseconds = unixTimestamp * 1000;

  // Create a new Date object using the milliseconds
  const dateObject = new Date(milliseconds);

  // Get the hour component from the date object
  const hours = dateObject.getHours();

  return <>{hours}:00</>;

}

export function UnixToDate (unixTimestamp){
  const timestamp = parseInt(unixTimestamp) * 1000;
  const date = new Date(timestamp);
  const dayOfWeek = date.getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[dayOfWeek];

  return (
    
      <>{day}</>
    
  );
}




// Function to convert Unix timestamp to AM/PM time format
export const convertUnixTimestampToHoursAMPM = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
  let hours = date.getHours();
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours %= 12;
  hours = hours || 12; // Handle midnight (0 hours)

  // Construct the AM/PM time string
  const timeInAMPM = `${hours}${period}`;

  return timeInAMPM;
};






