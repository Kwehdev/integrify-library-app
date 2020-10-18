import React from 'react'
import Head from 'next/head'

import Header from '../../components/Header'
import useTheme from '../../hooks/useTheme'
import styles from './CenteredLayout.module.css'

export default function CenteredLayout({ children }) {
  return <div className={styles.container}>{children}</div>
}
