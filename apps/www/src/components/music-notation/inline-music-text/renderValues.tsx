import s from './inlineMusicText.module.scss'

const renderValues = (values: any) => {
  const getValues = values.map((value) => {
    switch(value._type) {
      case 'rhythmicValue':
				return <span className={s.musicStyle}>{value.options}</span>;
			case 'accidental':
				return <span className={s.musicStyle}>{value.options}</span>;
			case 'musicText':
				return <span className={s.musicStyle}>{value.musicText}</span>;
			case 'clef':
				return <span className={s.musicStyle}>{value.options}</span>;
			case 'barValue':
				return <span className={s.musicStyle}>{value.options}</span>;
			case 'musicSymbol':
				return <span className={s.musicStyle}>{value.options}</span>;
    }
  })

  return getValues
}

export { renderValues }