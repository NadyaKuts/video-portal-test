import { Link } from 'react-router'
import routes from 'shared/constants/routes'
import errorLogo from './404.png'
import styles from './styles.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.notFoundContainer}>
        <img alt='not-found' className={styles.notFoundImg} src={errorLogo} />
        <p className={styles.error}>Что-то пошло не так...</p>
      </div>
      <Link className={styles.link} to={routes.main}>
        Вернуться на главную
      </Link>
    </div>
  )
}
