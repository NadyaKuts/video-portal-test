import SearchInput from 'features/Header/ui/SearchInput'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import colors from 'shared/constants/colors'
import { useDispatch, useSelector, type RootState } from 'shared/redux/store'
import {
  Order,
  setFilter,
  setSortBy,
  setSortOrder,
  Sort,
} from 'shared/redux/videoSlice'
import logo from './logo.png'
import styles from './styles.module.css'
import Filters from './ui/Filters'
import User from './ui/User'

export default function Header() {
  const dispatch = useDispatch()
  const { sortBy, sortOrder } = useSelector((state: RootState) => state.videos)

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterText, setFilterText] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (searchParams.get('sort')) {
      dispatch(setSortBy(searchParams.get('sort')))
    }
    if (searchParams.get('order')) {
      dispatch(setSortOrder(searchParams.get('order')))
    }
  }, [searchParams])

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <img alt='logo' src={logo} />
        <SearchInput
          onChange={(e) => setFilterText(e.target.value)}
          onSearch={() => dispatch(setFilter(filterText))}
          placeholder='Что бы ты хотел посмотреть?'
          value={filterText}
        />
        <Filters onClick={() => setShowFilters(!showFilters)} />
        <User />
      </div>

      <div className={styles.filters} style={{ height: showFilters ? 50 : 0 }}>
        <div className={styles.sortContainer}>
          <p className={styles.sort}>Сортировать по:</p>
          <div style={{ display: 'flex', gap: 19 }}>
            <button
              className={styles.sortButton}
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set('sort', Sort.Date)
                  return prev
                })
              }}
              style={{
                color: sortBy === Sort.Date ? colors.green : undefined,
              }}
            >
              дате
            </button>
            <button
              className={styles.sortButton}
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set('sort', Sort.Views)
                  return prev
                })
              }}
              style={{
                color: sortBy === Sort.Views ? colors.green : undefined,
              }}
            >
              просмотрам
            </button>
          </div>
        </div>
        <div className={styles.sortContainer}>
          <p className={styles.sort}>Порядок по:</p>
          <div style={{ display: 'flex', gap: 19 }}>
            <button
              className={styles.sortButton}
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('order', Order.Asc)
                  return prev
                })
              }
              style={{
                color: sortOrder === Order.Asc ? colors.green : undefined,
              }}
            >
              возрастанию
            </button>
            <button
              className={styles.sortButton}
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('order', Order.Desc)
                  return prev
                })
              }
              style={{
                color: sortOrder === Order.Desc ? colors.green : undefined,
              }}
            >
              убыванию
            </button>
          </div>
        </div>
        <div className={styles.sortContainer}>
          <p className={styles.sort} style={{ color: colors.blue }}>
            фильтровать по слову:
          </p>
          <input onChange={(e) => dispatch(setFilter(e.target.value))} />
        </div>
      </div>
    </div>
  )
}
