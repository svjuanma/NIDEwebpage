import './ExtraInfo.css'
import logo from '../assets/LOGO-NIDE.png';

interface Props {
  errorCode?: string,
  message: string
}

export const ExtraInfo = ({errorCode, message} : Props) => (
  <div className='page-wrapper'>
    <section className='image-nide'>
      <img src={logo} alt="NIDE" />
    </section>
    <section className='overlay'>
     <div className='text-container'>
       {errorCode && 
        <h1>{errorCode}</h1>
        }
        <h2>{message}</h2>
     </div>
    </section>
  </div>
)