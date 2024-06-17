import React from 'react'
import './HowItWorks.css'
import Money from '../../assets/money.png'

const HowItWorks = () => {
  return (
    <div className='how-container' id='howitworks'>
        <div className='heading-container'>
            <h2>How it works</h2>
            <p>Start First Golden Gifted Club Account</p>
        </div>
        <div className='content'>
            <div className='moto'>
                <p>First Golden Gifted Club</p>
                <p>The money making machine.</p>
                <p>The Auto pilot to wealth.</p>
                <img src={Money} alt=''/>
            </div>
            <div className='steps'>
                <ul>
                    <li className='diff-steps'>
                        <div>
                            <p className='num'>1</p>
                            <span className='line'></span>
                        </div>
                        
                        <div className='small-steps'>
                            <p className='bold-step'>Sign-up</p>
                            <p>Fill your personal details in 30 secs</p>
                        </div>
                    </li>
                    <li className='diff-steps'>
                        <div>
                            <p className='num'>2</p>
                            <span className='line'></span>
                        </div>
                        <div className='small-steps'>
                            <p className='bold-step'>Activate your Account</p>
                            <p>Activate your account with a one-time membership fee of #1,000 to get started</p>
                        </div>
                        
                    </li>
                    <li className='diff-steps'>
                        <div>
                            <p className='num'>3</p>
                            <span className='line'></span>
                        </div>
                        <div className='small-steps'>
                            <p className='bold-step'>Level up</p>
                            <p>Climb up 10 levels, the higher the level, the higher your estimated collection</p>
                        </div>
                       
                    </li>
                    <li className='diff-steps'>
                        <div>
                            <p className='num'>4</p>
                            <span className='line'></span>
                        </div>
                        <div className='small-steps'>
                            <p className='bold-step'>We verify</p>
                            <p>With our automated system, we verify your contributions made to an account </p> 
                        </div>
                        
                    </li>
                    <li className='diff-steps'>
                        <div>
                            <p className='num'>5</p>
                            <span className='line'></span>
                        </div>
                        <div className='small-steps'>
                            <p className='bold-step'>We Receive your funds</p>
                            <p>Your account is credited after the required number of members are complete</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
  )
}

export default HowItWorks