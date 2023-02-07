import s from './toggle.module.scss'

const Toggle = ({ handleNavToggle }) => {
	return (
		<button className={s.toggleButton} onClick={handleNavToggle}>
			Menu
		</button>
	)
}

export { Toggle }
