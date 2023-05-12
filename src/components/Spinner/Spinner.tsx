import { CgSpinner } from 'react-icons/cg'

import './style.css'

export const Spinner = () => {
  return (
    <div role="alert" aria-label="loading" className="spinner">
      <CgSpinner className="spin" />
    </div>
  )
}
