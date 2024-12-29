import colors from 'shared/constants/colors'
import Icon from 'shared/ui/Icon'
import styles from './styles.module.css'
export default function User() {
  return (
    <div className={styles.container}>
      <p className={styles.name}>Your Name</p>
      <Icon color={colors.blue} icon='profile' size={24} />
    </div>
  )
}
