import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
  isSameMonth,
} from "date-fns";

import "../styles/Calendar.css";
import CustomModal from "../Components/CustomModal";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const openModal = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setIsModalOpen(false);
  };

  function capitalizeFirstLetter(title) {
    if (title) {
      return title.charAt(0).toUpperCase() + title.slice(1);
    }
    return "";
  }

  return (
    <div className='calendar'>
      <div className='calendar-header'>
        <button onClick={prevMonth}>Previous</button>
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className='calendar-day-names'>
        <div className='day-name'>Mon</div>
        <div className='day-name'>Tue</div>
        <div className='day-name'>Wed</div>
        <div className='day-name'>Thu</div>
        <div className='day-name'>Fri</div>
        <div className='day-name'>Sat</div>
        <div className='day-name'>Sun</div>
      </div>
      <div className='calendar-grid'>
        {days.map((day) => (
          <div
            key={day}
            className={`calendar-day ${
              isSameMonth(day, currentDate) ? "" : "not-in-month"
            }`}
            onClick={() => openModal(day)}>
            <div className='day-number'>{format(day, "d")}</div>
            <div className='post-content'>
              {capitalizeFirstLetter(
                posts.find((post) => post.id === day.getDate())?.title
              )}
            </div>
          </div>
        ))}
      </div>
      <CustomModal
        isOpen={isModalOpen}
        post={posts.find((post) => post.id === selectedDay?.getDate())}
        onClose={closeModal}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default Calendar;
