const getMonthData = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = (firstDay.getDay() + 6) % 7; // Adjusting start day to Monday
  const totalDays = lastDay.getDate();

  const data = [];
  let day = 1;
  let isCurrentMonth = false;

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        week.push({ day: prevMonthLastDay - (startDay - j - 1), isCurrentMonth: false });
      } else if (day > totalDays) {
        isCurrentMonth = false;
        week.push({ day: day - totalDays, isCurrentMonth: false });
        day++;
      } else {
        isCurrentMonth = true;
        week.push({ day, isCurrentMonth: true });
        day++;
      }
    }
    data.push(week);
    if (!isCurrentMonth) break;
  }

  return data;
};

export { getMonthData }