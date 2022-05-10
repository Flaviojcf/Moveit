import { useState, useEffect } from "react";
import styles from "../styles/components/CountDown.module.css";
let countDownTimeout: NodeJS.Timeout;

export function CountDown() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(25 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
        {hasFinished ? (
           <button
           disabled
           className={styles.countDownButton} 
         >
           Ciclo encerrado
         </button>
        ) : (
            <>
            {isActive ? (
                <button
                  onClick={resetCountDown}
                  type="button"
                  className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                >
                  Abandonar Ciclo
                </button>
              ) : (
                <button
                  onClick={startCountDown}
                  type="button"
                  className={styles.countDownButton}
                >
                  Iniciar Ciclo
                </button>
              )}
              </>
        )}
    </div>
  );
}