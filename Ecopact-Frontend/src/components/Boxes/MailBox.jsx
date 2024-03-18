

const MailBox = ({mailToggled}) => {
  return (
    <div className={` absolute top-0 right-[237px] w-44 py-2 opacity-${mailToggled ? '100' : '0'} transition-all   bg-green-300 `}>
          test
    </div>
  )
}

export default MailBox
