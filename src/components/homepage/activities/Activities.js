import React from 'react'
import './Activities.css'
import Oddcard from './activities-card/Oddcard'
import Evencard from './activities-card/Evencard'

const Activities = () => {
  return (
    <div className='activities-container' id='activities'>
      <div className='activities-heading'>
        <p className='first-heading'>First Golden Gifted Club</p>
        <p className='second-heading'>Total Activities Breakdown!</p>
      </div>
      <div className='card-activities'>
        <div className='card-act odd'>
          <div className='act-statement'>
            <p>Membership fee #1000<br/>
            <strong>Level1<br/></strong>
              Level1=2persons cost 1k.<br/>
              Those 2persons send you 1k each.<br/>
              2×1000=#2,000<br/>
              Upgrade fee to level2 2k.<br/>
              </p>
          </div>
          <div>
            <p className='act-num'>1</p>
          </div>
        </div>
        <div className='card-act even'>
          <div className='act-statement'>
            <p><strong>Level2<br/></strong>
              Level2=4persons cost 2k<br/>
              Those 4persons send you 2k each.<br/>
              4×2,000=#8,000<br/>
              Upgrade fee to level3 4k.<br/>
              So take home in level2 is 4k.<br/>
              </p>
          </div>
          <div>
            <p className='act-num'>2</p>
          </div>
        </div>
        <div className='card-act odd'>
          <div className='act-statement'>
            <p><strong>Level3<br/></strong>
              Level3=8persons cost 4k<br/>
                Those 8persons send you 4k each.<br/>
                8×4,000=#32,000<br/>
                Upgrade fee to level4 is 8k.<br/>
                So take home in level3 is 24k.<br/>
                <br/>
              </p>
          </div>
          <div>
            <p className='act-num'>3</p>
          </div>
        </div>
        <div className='card-act even'>
          <div className='act-statement'>
            <p><strong>Level4<br/></strong>
              Level4=16persons cost 8k.<br/>
                Those 16persons send you 8k each.<br/>
                16×8,000=#128,000<br/>
                Upgrade fee to level5 is 16k.<br/>
                So take home in level4 is 112k.<br/>
                <br/>
              </p>
          </div>
          <div>
            <p className='act-num'>4</p>
          </div>
        </div>
        <div className='card-act odd'>
          <div className='act-statement'>
            <p><strong>Level5<br/></strong>
                Level5=32persons cost 16k <br/>
                Those 32persons send you 16k each.<br/>
                32×16,000=#512,000<br/>
                Upgrade fee to level6 32k.<br/>
                So take home in level5 is 480k.<br/>
              </p>
          </div>
          <div>
            <p className='act-num'>5</p>
          </div>
        </div>
        <div className='card-act even'>
          <div className='act-statement'>
            <p><strong>Level6<br/></strong>
                Level6=64persons cost 32k.<br/>
                Those 64persons send you 32k each.<br/>
                64×32,000=#2,048,000<br/>
                Upgrade fee to level7 is 64k.<br/>
                So take home in level6 is #1,984,000<br/>
              </p>
          </div>
          <div>
            <p className='act-num'>6</p>
          </div>
        </div>
        <div className='card-act odd'>
          <div className='act-statement'>
            <p><strong>Level7<br/></strong>
                Level7=128persons cost 64k.<br/>
                Those 128persons send you 64k each.<br/>
                128×64,000=#8,192,000<br/>
                Upgrade fee to level8 is 128k.<br/>
                So take home in level7 is #8,064,000<br/>
                <br/>
              </p>
          </div>
          <div>
            <p className='act-num'>7</p>
          </div>
        </div>
        <div className='card-act even'>
          <div className='act-statement'>
            <p><strong>Level8<br/></strong>
                Level8=256persons cost 128k.<br/>
                Those 256persons send you 128k each.<br/>
                256×128,000=#32,768,000<br/>
                Upgrade fee to level9 is 256k.<br/>
                So take home in level8 is #32,512,000<br/>
              </p>
          </div>
          <div>
            <p className='act-num'>8</p>
          </div>
        </div>
        <div className='card-act odd'>
          <div className='act-statement'>
            <p><strong>Level9<br/></strong>
              Level9=512persons cost 256k.<br/>
              Those 512persons send you 256k each.<br/>
              512×256,000=#131,072,000<br/>
              Upgrade fee to level10 is 512k.<br/>
              So take home in level9 is #130,560,000<br/>
              </p>
          </div>
          <div>
            <p className='act-num'>9</p>
          </div>
        </div>
        <div className='card-act even'>
          <div className='act-statement'>
            <p><strong>Level10<br/></strong>
              Level10=1024persons cost 512k.<br/>
              Those 1024persons send you 512k each.<br/>
              1024×512,000=#524,288,000 <br/>
              </p>
          </div>
          <div>
            <p className='act-num'>10</p>
          </div>
        </div>
      </div>

      {/* <div className='card-activities'>
        <Oddcard  num='1' statement='Membership Fee #1,000 Level1= 2persons and cost 1k Those 2persons send you 1k each and you are with 2k Upgrade fee to level2 is #2k'/>
        <Evencard num='2' statement= 'Level2 = 4persons and cost 2k Those 4persons send you 2k each 4x2,000=#8,000 Upgrade fee to level3 is 4k, so take-home in level2 is 4k'/>
        <Oddcard num='3' statement='Level3 = 8persons and cost 4k Those 8persons send you 4k each 8x4,000=#32,000 Upgrade fee to level4 is 8k, so take-home in level3 is 24k' />
        <Evencard num='4' statement= 'Level4 = 16persons and cost 8k Those 16persons send you 8k each 16x8,000=#128,000 Upgrade fee to level5 is 16k, so take-home in level4 is #112,000'/>
        <Oddcard num='5' statement='Level5 = 32persons cost 16k Those 32persons send you #16k each 32×16,000=#512,000 Upgrade fee to level6 is 32k, so take-home in level5 is #480,000' />
        <Evencard num='6' statement= 'Level6 = 64persons cost 32k Those 64persons send you 32k each 64×32,000=#2,048,000 Upgrade fee to level7 is 64k, so take-home in level6 is #1,984,000'/>
        <Oddcard num='7' statement='Level7 = 128persons cost #64k Those 128persons send you 64k each 128×64,000=#8,192,000 Upgrade fee to level8 is #128,000 so take-home in level7 is #8,064,000' />
        <Evencard num='8' statement= 'Level8 = 256persons cost #128,000 Those 256persons send you #128,000 each 256×#128,000=#32,768,000 Upgrade fee to level9 is #256,000 so take-home in level8 is #32,512,000'/>
        <Oddcard num='9' statement='Level9 = 512persons cost #256,000 Those 512persons send you #256,000 each 512×256,000=#131,072,000 Upgrade fee to level10 is #512,000 so take-home in level9 is #130,560,000' />
        <Evencard num='10' statement= 'Level10 = 1024persons cost #512,000 Those 1024persons send you #512,000 each 1024×#512,000=#524,288,000'/>
      </div> */}
      <div className='dont'>
        <p>Don’t forget all take-home in each level goes direct to your local bank account and not with anyone else or the site. The Money Making Machine</p>
      </div>

    </div>
  )
}

export default Activities