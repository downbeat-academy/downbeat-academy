import classnames from 'classnames'
import s from './item-grid.module.scss';

const ItemGrid = ({ children }) => {
  return (
    <section>
      <p>Items</p>
      {children}
    </section>
  )
}

export { ItemGrid }