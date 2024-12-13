"use client"

import React, {FC} from 'react';
import styles from './layout.module.scss';
import Toolbar from '@/app/components/Toolbar';
import {redirect} from 'next/navigation';

type Props = {
  children: React.ReactNode,
}

const DashBoard: FC<Props> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Toolbar />
      {children}
    </div>
  );
};

export default DashBoard;
