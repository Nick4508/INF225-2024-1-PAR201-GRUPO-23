import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Example = () => {
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  {
    const [startDate, setStartDate] = useState(new Date());
    return (

      <div classname="calendario">

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        filterDate={isWeekday}
        inline
        />
      </div>
    );
  };
 
};

export default Example