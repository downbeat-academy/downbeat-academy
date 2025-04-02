import React from 'react'

interface Props {
  path: string
  onChange?: (value: string) => void
  value?: string
}

const SlugField: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(props.value || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    setValue(val)
    props.onChange?.(val)
  }

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.375rem',
        }}
      />
      {value && (
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '0.8rem',
            color: '#9ca3af',
          }}
        >
          {`/${value}`}
        </div>
      )}
    </div>
  )
}

export default SlugField