import React from 'react';
import { letterFrequency } from '@visx/mock-data';
import { ParentSize } from '@visx/responsive';
import { BarChart } from '../BarChart';
import styles from './app.module.scss';

export const App: React.FC = () => {
  const data = letterFrequency.map((d) => ({ x: d.letter, y: d.frequency }));

  return (
    <div className={styles.wrapper}>
      <div className={styles['chart-root']}>
        <div className={styles['chart-wrapper']}>
          <ParentSize className={styles['chart-inner']}>
            {(parent) =>
              parent.width &&
              parent.height && (
                <BarChart
                  data={data}
                  width={parent.width}
                  height={parent.height}
                />
              )
            }
          </ParentSize>
        </div>
      </div>
    </div>
  );
};
