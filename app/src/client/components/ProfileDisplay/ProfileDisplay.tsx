import useAuth from '../../hooks/useAuth'

import styles from './ProfileDisplay.module.css'

export default function ProfileDisplay() {
  const { user } = useAuth()
  const { username, firstName, lastName, email, role } = user
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Data</h1>
      <table className={styles.infoContainer}>
        <tr>
          <td className={styles.tableData}>Username: </td>
          <td className={styles.tableData}>{username}</td>
        </tr>
        <tr>
          <td className={styles.tableData}>First name: </td>
          <td className={styles.tableData}>{firstName}</td>
        </tr>
        <tr>
          <td className={styles.tableData}>Last name: </td>
          <td className={styles.tableData}>{lastName}</td>
        </tr>
        <tr>
          <td className={styles.tableData}>Email: </td>
          <td className={styles.tableData}>{email}</td>
        </tr>
        <tr>
          <td className={styles.tableData}>Role: </td>
          <td className={styles.tableData}>{role}</td>
        </tr>
      </table>
    </div>
  )
}
