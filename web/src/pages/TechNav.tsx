import React from 'react'
import { Grid, Image } from 'semantic-ui-react'


const TechNav = () => (
  <Grid columns={3} divided>
    <Grid.Row>
    <h1>What would you like to improve on?</h1>
      <Grid.Column>
        <Image src='https://d14mxsq3tik0lq.cloudfront.net/wp-content/uploads/2020/12/IMG_5760-750x400.jpg' />
        <h1>Guard</h1>
      </Grid.Column>
      <Grid.Column clasName='grid-item'>
        <Image src='https://d14mxsq3tik0lq.cloudfront.net/wp-content/uploads/2020/12/IMG_3438.jpg' />
        <h1>Passing</h1>
      </Grid.Column>
      <Grid.Column className='gird-item'>
        <Image src='https://d14mxsq3tik0lq.cloudfront.net/wp-content/uploads/2020/03/Cover-Image-933x400.jpg' />
        <h1>Self Defense</h1>
      </Grid.Column>

    </Grid.Row>

    <Grid.Row>
      <Grid.Column className='grid-item'>
        <Image src='https://d14mxsq3tik0lq.cloudfront.net/wp-content/uploads/2018/11/M94KG_IMG_8865-630x420.jpg' />
        <h1>Body Conditioning</h1>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default TechNav