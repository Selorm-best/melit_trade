import { useEffect, useState } from 'react';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsExpired(false);
    };

    // Calculate immediately
    calculateTimeLeft();

    // Set up interval
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  if (isExpired) {
    return (
      <div className="categories__deal__countdown__timer expired" id="countdown">
        <div className="expired-message">
          <span>Deal Expired</span>
          <p>This offer has ended</p>
        </div>
      </div>
    );
  }

  return (
    <div className="categories__deal__countdown__timer" id="countdown">
      <div className="cd-item">
        <span className="countdown-number">{formatNumber(timeLeft.days)}</span>
        <p>Days</p>
      </div>
      <div className="cd-item">
        <span className="countdown-number">{formatNumber(timeLeft.hours)}</span>
        <p>Hours</p>
      </div>
      <div className="cd-item">
        <span className="countdown-number">{formatNumber(timeLeft.minutes)}</span>
        <p>Minutes</p>
      </div>
      <div className="cd-item">
        <span className="countdown-number">{formatNumber(timeLeft.seconds)}</span>
        <p>Seconds</p>
      </div>
    </div>
  );
};

export default Countdown;
