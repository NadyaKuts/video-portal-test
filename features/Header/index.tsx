import Input from 'features/Header/ui/SearchInput'
import logo from './logo.png'
import styles from './styles.module.css'
import Filters from './ui/Filters'
import User from './ui/User'

export default function Header() {
  return (
    <div className={styles.container}>
      <img alt='logo' src={logo} />
      <Input placeholder='Что бы ты хотел посмотреть?' />
      <Filters onClick={() => {}} />
      <User />
    </div>
  )
}
