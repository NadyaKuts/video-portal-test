import React, { useState } from 'react'
import colors from 'shared/constants/colors'
import { loginUser, registerUser } from 'shared/redux/authSlice'
import { useDispatch } from 'shared/redux/store'
import Button from 'shared/ui/Button'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import styles from './styles.module.css'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: Props) {
  const dispatch = useDispatch()

  const [isRegister, setIsRegister] = useState(false)

  const initForm = {
    name: { value: '', error: false },
    lastName: { value: '', error: false },
    email: { value: '', error: false },
    password: { value: '', error: false },
  }

  const [formData, setFormData] = useState(initForm)

  const handleClose = () => {
    setFormData(initForm)
    setIsRegister(false)
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isRegister) {
      setFormData((prev) => ({
        ...prev,
        email: { ...prev.email, error: !formData.email.value },
        password: { ...prev.password, error: !formData.password.value },
        name: { ...prev.name, error: !formData.name.value },
        lastName: { ...prev.lastName, error: !formData.lastName.value },
      }))

      const hasError =
        !formData.email.value ||
        !formData.password.value ||
        !formData.name.value ||
        !formData.lastName.value

      if (!hasError) {
        await dispatch(
          registerUser({
            email: formData.email.value,
            password: formData.password.value,
            lastName: formData.lastName.value,
            name: formData.name.value,
          })
        )
        handleClose()
      }
    } else {
      const user = await dispatch(
        loginUser({
          email: formData.email.value,
          password: formData.password.value,
        })
      )

      if (user.type.includes('rejected'))
        setFormData((prev) => ({
          ...prev,
          email: { ...prev.email, error: true },
          password: { ...prev.password, error: true },
        }))
      else handleClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isRegister ? 'Register' : 'Login'}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {!!isRegister && (
          <>
            <Input
              hasError={formData.name.error}
              label='First Name'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: { ...prev.name, value: e.target.value },
                }))
              }
              required
              type='text'
              value={formData.name.value}
            />
            <Input
              hasError={formData.lastName.error}
              label='Last Name'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: { ...prev.lastName, value: e.target.value },
                }))
              }
              required
              type='text'
              value={formData.lastName.value}
            />
          </>
        )}
        <Input
          hasError={formData.email.error}
          label={isRegister ? 'email' : 'login'}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: { ...prev.email, value: e.target.value },
            }))
          }
          required
          type='email'
          value={formData.email.value}
        />
        <Input
          hasError={formData.password.error}
          label='password'
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: { ...prev.password, value: e.target.value },
            }))
          }
          required
          type='password'
          value={formData.password.value}
        />

        <div className={styles.buttonsContainer}>
          <Button
            onClick={() => setIsRegister(!isRegister)}
            style={{
              height: 30,
              backgroundColor: colors.white,
              boxShadow: 'none',
              textDecoration: 'underline',
              color: colors.blue,
            }}
            text={isRegister ? 'Login' : 'Register'}
            type='button'
          />
          <Button
            onClick={handleSubmit}
            style={{ height: 30 }}
            text={isRegister ? 'Register' : 'Login'}
            type='submit'
          />
        </div>
      </form>
    </Modal>
  )
}
