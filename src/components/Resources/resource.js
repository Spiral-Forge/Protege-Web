import React from 'react';
import './Resource.css'
import developimg from './development.png'
import mlimg from './ml.png'
import scimg from './scholarship.png'
import dev2img from './dev2.png'
import dev3img from './dev3.png'
import gitimg from './git.png'
import ResourceCard from './ResourceCard'
import ResourcePage from './resourcepage';
function Resource() {
  const resources=[
    {
      title: "abc",
      link:"abc.com"
    },
    {
      title: "abc",
      link:"abc.com"
    },
    {
      title: "abc",
      link:"abc.com"
    },
    {
      title: "abc",
      link:"https://www.abc.com"
    },
  ]
    return (
      <div className='Resourcecontainer'>
        <h1 className='heading'> Resources Center</h1>
        <div className='row'>
          <ResourceCard className='col-sm'src={developimg}  heading='Developement' />
          <ResourceCard className='col-sm'src={mlimg}heading='Machine Learning' />
          <ResourceCard className='col-sm'src={scimg} heading='Scholarships' />
        </div>
        <div className='row'>
          <ResourceCard className='col-sm'src={gitimg} heading='Open Source' />
          <ResourceCard className='col-sm'src={dev2img}  heading='Developement' />
          <ResourceCard className='col-sm'src={dev3img}  heading='Developement' />
        </div>
     </div>
    );
  }
  
  export default Resource;