import colors from 'shared/constants/colors'
import Icon from 'shared/ui/Icon'
import styles from './styles.module.css'

type Props = {
  onClick: () => void
}
export default function Filters({ onClick }: Props) {
  return (
    <button className={styles.container} onClick={onClick}>
      <Icon color={colors.white} icon='settings' size={15} />
    </button>
  )
}
