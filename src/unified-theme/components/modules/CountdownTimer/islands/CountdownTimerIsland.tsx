import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { CountdownTimerProps, GroupStyle, TimeLeft, EndDate, CounterStyles, CounterLabelsStyles } from '../types.js';

const CountdownTimer = styled.time`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: var(--hsElevate--spacing--12, 12px);

  @media (min-width: 767px) {
    gap: var(--hsElevate--spacing--20, 20px);
  }
`;

const TimeUnitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--hsElevate--spacing--8, 8px);
  /* Width logic:
   * - Tries to be 200px wide by default
   * - Won't go smaller than 25% of container width
   * - Will shrink below 200px if 25% of container is smaller
   * - Will expand beyond 200px if 25% of container is larger
  */
  width: max(min(200px, 25%), 25%);
`;

const Value = styled.span<{ $counter: CounterStyles }>`
  width: 100%;
  padding: var(--hsElevate--spacing--16, 16px) var(--hsElevate--spacing--12, 12px);
  border: ${({ $counter }) => $counter?.borderThickness}px solid ${({ $counter }) => $counter?.borderColor?.color};
  border-radius: var(--hsElevate-rounded);
  color: ${({ $counter }) => $counter?.textColor?.color};
  font-size: clamp(1rem, 5vw + 1rem, var(--hsElevate--display1__fontSize));
  line-height: 1;
  text-align: center;
  ${({ $counter }) =>
    $counter?.fill === 'filled' &&
    `
    background-color: ${$counter.fillColor?.color};
  `}

  @media (min-width: 767px) {
    padding: var(--hsElevate--spacing--32, 32px) var(--hsElevate--spacing--24, 24px);
  }
`;

const Label = styled.span<{ $counterLabels: CounterLabelsStyles }>`
  width: 100%;
  color: ${({ $counterLabels }) => $counterLabels?.textColor?.color};
  font-size: clamp(0.75rem, 1vw + 0.75rem, var(--hsElevate--h4__fontSize));
  text-align: center;
`;

const CompletedMessage = styled.p<{ $counterLabels: CounterLabelsStyles }>`
  color: ${({ $counterLabels }) => $counterLabels?.textColor?.color};
  text-align: center;
`;

const calculateTimeLeft = (endDate: EndDate): TimeLeft => {
  // Calculate difference between the current date and end date in seconds
  const differenceBetweenDates = (endDate - Date.now()) / 1000;
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const secondsPerHour = secondsPerMinute * minutesPerHour;
  const hoursPerDay = 24;

  // Based on the difference, calculate the time left for days, hours, minutes, and seconds
  return {
    days: Math.floor(differenceBetweenDates / (secondsPerHour * hoursPerDay)),
    hours: Math.floor((differenceBetweenDates / secondsPerHour) % hoursPerDay),
    minutes: Math.floor((differenceBetweenDates / secondsPerMinute) % minutesPerHour),
    seconds: Math.floor(differenceBetweenDates % secondsPerMinute),
  };
};

type TimeUnitProps = {
  value: number;
  label: string;
  groupStyle: GroupStyle;
};

const TimeUnit = (props: TimeUnitProps) => {
  const {
    value,
    label,
    groupStyle: { counter, counterLabels },
  } = props;
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <TimeUnitContainer className="hs-elevate-countdown-timer__time-unit-container">
      <Value className="hs-elevate-countdown-timer__value" $counter={counter}>
        {formatNumber(value)}
      </Value>
      <Label className="hs-elevate-countdown-timer__label" $counterLabels={counterLabels}>
        {label}
      </Label>
    </TimeUnitContainer>
  );
};

export default function CountdownTimerIsland(props: CountdownTimerProps) {
  const {
    endDate,
    groupStyle,
    groupPlaceholderText: { days, hours, minutes, seconds, completedMessage },
  } = props;

  // Calculate initial time remaining
  const initialTime = calculateTimeLeft(endDate);

  // Initialize state with calculated value
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTime);

  // Effect hook to manage the interval timer
  useEffect(() => {
    // Define update function to recalculate time remaining
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft(endDate));
    };

    // Initial calculation
    updateTimer();

    // Set up interval for updates if end date hasn't passed
    if (endDate > Date.now()) {
      const interval = setInterval(updateTimer, 1000);
      // Clean up interval on unmount or when endDate changes
      return () => clearInterval(interval);
    }
  }, [endDate]);

  const dateTimeString = new Date(endDate).toISOString();

  // If countdown is complete, show a message
  if (endDate <= Date.now()) {
    return (
      <StyledComponentsRegistry>
        <CompletedMessage className="hs-elevate-countdown-timer__completed-message" $counterLabels={groupStyle.counterLabels}>
          {completedMessage}
        </CompletedMessage>
      </StyledComponentsRegistry>
    );
  }

  return (
    <StyledComponentsRegistry>
      <CountdownTimer className="hs-elevate-countdown-timer" dateTime={dateTimeString}>
        <TimeUnit value={timeLeft.days} label={days} groupStyle={groupStyle} />
        <TimeUnit value={timeLeft.hours} label={hours} groupStyle={groupStyle} />
        <TimeUnit value={timeLeft.minutes} label={minutes} groupStyle={groupStyle} />
        <TimeUnit value={timeLeft.seconds} label={seconds} groupStyle={groupStyle} />
      </CountdownTimer>
    </StyledComponentsRegistry>
  );
}
