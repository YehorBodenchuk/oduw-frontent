"use client"

import styles from './index.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';

const links = [
  {
    id: 1,
    src: '/assets/icons/settings_icon.svg',
    alt: 'settingsIcon',
    href: '/dashboard/profile'
  },
  {
    id: 2,
    src: '/assets/icons/chat_icon.svg',
    alt: 'settingsIcon',
    href: '/dashboard/chat'
  },
  {
    id: 3,
    src: '/assets/icons/task.svg',
    alt: 'todoIcon',
    href: '/dashboard/todo'
  }
]

const Toolbar = () => {
  const [active, setActive] = useState(1);

  return (
    <div className={styles.root}>
      {
        links.map(({ href, src, alt, id }) => (
          <Link
            href={href}
            className={active === id ? styles.active : ''}
            key={id}
            onClick={() => setActive(id)}
          >
            <Image
              src={src}
              alt={alt}
              width={40}
              height={40}
            />
          </Link>
        ))
      }
    </div>
  );
};

export default Toolbar;
