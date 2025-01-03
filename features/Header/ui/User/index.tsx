import AuthModal from 'features/AuthModal'
import VideoModal from 'features/VideoModal'
import { useState } from 'react'
import colors from 'shared/constants/colors'
import { logout } from 'shared/redux/authSlice'
import { useDispatch, useSelector, type RootState } from 'shared/redux/store'
import Button from 'shared/ui/Button'
import Icon from 'shared/ui/Icon'
import styles from './styles.module.css'

export default function User() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const isAuth = user?.id
  const [showUser, setShowUser] = useState(false)
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()

    await dispatch(logout())
  }
  return (
    <div className={styles.container}>
      {isAuth ? (
        <VideoModal isOpen={showUser} onClose={() => setShowUser(false)} />
      ) : (
        <AuthModal isOpen={showUser} onClose={() => setShowUser(false)} />
      )}
      {!!isAuth && (
        <p className={styles.name}>{`${user?.name} ${user?.lastName}`}</p>
      )}
      <button
        onClick={() => {
          if (!isAuth) setShowUser(!showUser)
        }}
      >
        <Icon color={colors.blue} icon='profile' size={24} />
      </button>
      {!!isAuth && (
        <Button onClick={() => setShowUser(!showUser)} text='Add video' />
      )}
      {!!isAuth && <Button onClick={handleLogout} text='Logout' />}
    </div>
  )
}
