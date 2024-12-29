import colors from 'shared/constants/colors'
import Icon from 'shared/ui/Icon'
import styles from './styles.module.css'

export type IconBarProps = {
  data: BarItemProps[]
}

export default function IconBar({ data }: IconBarProps) {
  return (
    <div className={styles.container}>
      {data.map((item, index) => (
        <BarItem key={item.icon + index} {...item} />
      ))}
    </div>
  )
}

type BarItemProps = {
  icon: string
  counter?: number | string
}

function BarItem({ icon, counter }: BarItemProps) {
  return (
    <div className={styles.item}>
      <Icon color={colors.black} icon={icon} size={15} />
      {!!counter && <p className={styles.counter}>{counter}</p>}
    </div>
  )
}
