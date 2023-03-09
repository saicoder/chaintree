interface ButtonProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant?: 'primary' | 'link' | 'outline'
}

export function Button(props: ButtonProps) {
  const classes = (() => {
    if (props.variant === 'outline') return 'border border-brand text-brand'
    if (props.variant === 'link') return 'text-gray-600 hover:bg-gray-100'

    return 'bg-brand text-white'
  })()

  return (
    <div
      {...props}
      className={`px-4 py-3 font-medium text-center text-base rounded-lg hover:opacity-75 cursor-pointer ${classes} ${props.className}`}
    />
  )
}
