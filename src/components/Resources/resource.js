import React from 'react';
import './Resource.css'
import developimg from './development.png'
import mlimg from './ml.png'
import scimg from './scholarship.png'
import dev2img from './dev2.png'
import dev3img from './dev3.png'
import gitimg from './git.png'
import ResourceCard from './ResourceCard'
function Resource() {
    return (
      <div className='Resourcecontainer'>
        <h1 className='heading'> Resources Center</h1>
        <div className='row'>
          <ResourceCard className='col-sm'src={developimg}  heading='Development' />
          <ResourceCard className='col-sm'src={mlimg} heading='ML' />
          <ResourceCard className='col-sm'src={scimg} heading='Scholarship' />
        </div>
        <div className='row'>
          <ResourceCard className='col-sm'src={gitimg} heading='OpenSource' />
          <ResourceCard className='col-sm'src={dev2img}  heading='CompCoding' />
          <ResourceCard className='col-sm'src={dev3img}  heading='Misc' />
        </div>
     </div>
    );
  }
  
  export default Resource;