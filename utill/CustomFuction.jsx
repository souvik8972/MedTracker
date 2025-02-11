export const generateDateRange = (startDate, endDate) => {
    const dates = [];
    
    // Convert "DD/MM/YYYY" string to Date object
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
    };

    let currentDate = parseDate(startDate);
    const end = parseDate(endDate);

    // console.log({ startDate, endDate, currentDate, end });

    while (currentDate <= end) {
        dates.push(currentDate.toLocaleDateString("en-GB")); // Ensure DD/MM/YYYY format
        currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
    }

    return dates;
};

export const getSevenDays = () => {
    const dates = [];
    const date = new Date(); // Start with the current date
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(date); // Clone the current date
      newDate.setDate(date.getDate() + i); // Add 'i' days to the current date
  
      // Get the weekday name and the day of the month
      const weekday = weekdayNames[i];
      const day = newDate.getDate();
      const month = newDate.getMonth() + 1; // Get the month (0-based, so add 1)
      const year = newDate.getFullYear();
  
      // Manually format the date as MM/DD/YYYY with leading zeros
      
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

  
      // Push the formatted date and weekday to the array
      dates.push({ date: day, day: weekday, fulldate: formattedDate });
    }
  
    return dates;
  };
  
  
  export const getPreviousSevenDays = () => {
    const dates = [];
    const date = new Date(); // Start with the current date
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    for (let i = 1; i <= 7; i++) { // Start from 1 to exclude today
      const newDate = new Date(date); // Clone the current date
      newDate.setDate(date.getDate() - i); // Subtract 'i' days from today
  
      // Get the weekday name and the day of the month
      const weekday = weekdayNames[newDate.getDay()];
      const day = newDate.getDate();
      const month = newDate.getMonth() + 1; // Month is 0-based, so add 1
      const year = newDate.getFullYear();
  
      // Format the date as DD/MM/YYYY with leading zeros
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  
      // Push the formatted date and weekday to the array
      dates.unshift({ date: day, day: weekday, fulldate: formattedDate });
    }
  
    return dates;
  };
  