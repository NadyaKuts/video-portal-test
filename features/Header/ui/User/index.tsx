import AuthModal from 'features/AuthModal'
import VideoModal from 'features/VideoModal'
import { useState } from 'react'
import colors from 'shared/constants/colors'
import { logout } from 'shared/redux/authSlice'
import { useDispatch, useSelector, type RootState } from 'shared/redux/store'
import Icon from 'shared/ui/Icon'
import styles from './styles.module.css'

export default function User() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [showUser, setShowUser] = useState(false)
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()

    await dispatch(logout())
  }
  return (
    <div className={styles.container}>
      {user?.name ? (
        <VideoModal isOpen={showUser} onClose={() => setShowUser(false)} />
      ) : (
        <AuthModal isOpen={showUser} onClose={() => setShowUser(false)} />
      )}
      {!!user?.name && (
        <p className={styles.name}>{`${user?.name} ${user?.lastName}`}</p>
      )}
      <button onClick={() => setShowUser(!showUser)}>
        <Icon color={colors.blue} icon='profile' size={24} />
      </button>
      {!!user?.id && <button onClick={handleLogout}>Logout</button>}
    </div>
  )
}
