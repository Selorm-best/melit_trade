import { useEffect, useState } from 'react';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="categories__deal__countdown__timer" id="countdown">
      <div className="cd-item">
        <span>{timeLeft.days}</span>
        <p>Days</p>
      </div>
      <div className="cd-item">
        <span>{timeLeft.hours}</span>
        <p>Hours</p>
      </div>
      <div className="cd-item">
        <span>{timeLeft.minutes}</span>
        <p>Minutes</p>
      </div>
      <div className="cd-item">
        <span>{timeLeft.seconds}</span>
        <p>Seconds</p>
      </div>
    </div>
  );
};

export default Countdown;
