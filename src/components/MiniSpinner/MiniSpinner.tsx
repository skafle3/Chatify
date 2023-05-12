import { ImSpinner8 } from 'react-icons/im'

import './style.css'

export const MiniSpinner = () => {
  return (
    <div role="alert" aria-label="loading" className="mini-spinner">
      <ImSpinner8 className="spin" />
    </div>
  )
}
