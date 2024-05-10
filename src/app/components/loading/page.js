import React from 'react'
import LoadingSpinner from '../../media/icons8-loading-circle.gif'
const Loading = () => {
  return (
    <div>Loading
        <video controls >
            <source src={LoadingSpinner} type='video/mp4' />
        </video>
    </div>
  )
}

export default Loading