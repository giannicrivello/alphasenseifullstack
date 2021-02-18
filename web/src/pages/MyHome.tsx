import React from 'react';
import { Button } from 'semantic-ui-react';
import { useGetTechQuery, useUsersQuery } from '../generated/graphql';
import { Bye } from './Bye';
import './styles/MyHome.css';

interface Props {

}

const MyHome: React.FC<Props> = () => {
    const {data} = useGetTechQuery();

    //error handle
    if (!data) {
        return <div>loading...</div>
}

return (
    <>
    <div className='tech-nav'>
      <div className='tech-nav-item'>
      <Button circular size='big' color='black'>
          💥
          <div>passing</div>
      </Button>
      </div>
      <div className='tech-nav-item'>
      <Button circular color='black' size='big'>
          ⚔️
          <div>guard</div>
      </Button>

      </div>
      <div className='tech-nav-item'>
      <Button circular size='big' color='black'>
          🤼
          <div>takedowns</div>
     </Button>
      </div>
  </div>
   <div>
   <div>Users</div>
   <ul>
       {data.techniques.map(x => {
           //key is important when mapping over an array in react
           return (
           <ul key={x.id}>
               <li>{x.title}</li>
               <li>{x.description}</li>
               <li>
                   <img src={x.image}/>
                </li>
            </ul>
           )
       })}
   </ul>
   <Bye />
   
</div>
</>



)
}

export default MyHome
