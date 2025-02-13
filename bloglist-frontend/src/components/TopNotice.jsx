import './index.css'

const TopNotice = ({ message }) => {
  if (message.success === null) {
    return null
  } else if(message.success === true){
    return (
      <div className='notification'>
        {message.text}
      </div>
    )
  }else{
    return (
      <div className='errornotification'>
        {message.text}
      </div>
    )
  }
}

export default TopNotice