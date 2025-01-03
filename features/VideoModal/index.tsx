import Button from 'shared/ui/Button'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import styles from './styles.module.css'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function VideoModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Create new card'>
      <form className={styles.form} onSubmit={() => {}}>
        <Input label='Title' />
        <Input label='Description' />
        <Input label='Img' />
        <Input label='Link video' />

        <div className={styles.buttonsContainer}>
          <Button style={{ height: 30 }} text='Create card' type='submit' />
        </div>
      </form>
    </Modal>
  )
}
