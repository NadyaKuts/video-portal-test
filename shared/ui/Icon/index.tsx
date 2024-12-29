'use client'

import IcomoonReact from 'icomoon-react'
import { type CSSProperties } from 'react'
import colors from 'shared/constants/colors'
import iconSet from './selection.json'

type Props = {
  color?: string
  icon: string
  size?: number
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

export default function Icon({
  color,
  size = 24,
  icon,
  style,
  className,
}: Props) {
  if (typeof document !== 'undefined') {
    return (
      <IcomoonReact
        className={className}
        color={color || colors.gray}
        icon={icon}
        iconSet={iconSet}
        size={size}
        style={style}
      />
    )
  }
}
