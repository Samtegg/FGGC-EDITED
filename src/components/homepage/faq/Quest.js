import React from 'react'
import './Quest.css'

const Quest = () => {
  return (
    <div className='quest-container'>
        <div className='quest-content'>
            <h3>What it is All About?</h3>
            <p>First Golden Gifted Club is an online club designed to help 
                members generate money among their self's through one time 
                #1,000 (One thousand naira) membership fee.
            </p>
        </div>

        <div className='quest-content'>
            <h3>How To Become A Member?</h3>
            <p>To become a member you join by clicking on the Sign up or 
                create account and enter your required information and submit, 
                once registration successful you save your one time private membership code 
                and proceed to update your bank account, then proceed to your allocated member's 
                bank details and send him/her your one time #1,000 (One thousand naira) membership 
                fee to become an active member of the club.

            </p>
        </div>

        <div className='quest-content'>
            <h3>Next Activities?</h3>
            <p>Once an active member two new incoming members would be allocated 
                to send you their membership fee which you'll immediately use to 
                upgrade your account to level2, every first and second donation you
                 receive in any new level is for you to upgrade to the next level.
            </p>
        </div>
        <div className='quest-content'>
            <h3>Subsequent Payment?</h3>
            <p>Finally, once you step up to level5 automatically your account would be
                 upgraded to monthly advert fee of #500 (Five hundred naira) till you completely
                  receive your last donation at level10.
            </p>
        </div>
    </div>
  )
}

export default Quest