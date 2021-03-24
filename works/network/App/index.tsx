import React from 'react';
import { ParentSize } from '@visx/responsive';
import styles from './app.module.scss';
import { Network } from '../Network';

export const App: React.FC = () => {
  const nodes = [
    { id: 'A', x: 20, y: 50 },
    { id: 'B', x: 200, y: 300 },
    { id: 'C', x: 500, y: 40 },
    { id: 'D', x: 230, y: 100 },
  ];

  const links = [
    { source: 'A', target: 'B' },
    { source: 'B', target: 'C' },
    { source: 'C', target: 'D' },
    { source: 'D', target: 'A' },
    { source: 'D', target: 'B' },
  ];

  const data = { nodes, links };

  return (
    <div className={styles.wrapper}>
      <div className={styles['graph-root']}>
        <div className={styles['graph-wrapper']}>
          <ParentSize className={styles['graph-inner']}>
            {(parent) =>
              parent.width &&
              parent.height && (
                <Network
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
