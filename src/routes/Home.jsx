/* eslint-disable camelcase */
import React from 'react'
import { connect } from 'react-redux'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Chip from 'material-ui/Chip'

// Custom styles on top of material ui components
const CardHeaderWithStyles = (props) => {
  const titleStyle = { fontSize: '18px', fontWeight: 'bold' }
  return <CardHeader {...props} titleStyle={titleStyle} />
}
const CardTextWithStyles = (props) => {
  const cardTextStyle = { paddingTop: '0' }
  return <CardText {...props} style={cardTextStyle} />
}

const WorkExperience = ({title, subtitle, items}) => {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} titleStyle={{fontSize: '16px'}} actAsExpander showExpandableButton />
      <CardTextWithStyles expandable>
        <ul>
          {items.map((item, i) => {
            return (
              <li key={i}>{item}</li>
            )
          })}
        </ul>
      </CardTextWithStyles>
    </Card>
  )
}

const SkillCategory = ({category, skills}) => {
  // chip styles must be inlined to override component styles, which are inlined.
  const chipStyles = { display: 'inline-block', margin: '1px' }
  return (
    <div className='skill-category'>
      <div className='skill-category-header'>{category}</div>
          {skills.map((skill, i) => {
            return (<Chip style={chipStyles} key={i}>{skill}</Chip>)
          })}
    </div>
  )
}

const Home = ({user}) => {
  const { first_name, profile_img_url, full_name, summary, education, work_experience, academic_projects, awards, skills } = user
  return (
    <div className='home-container'>
      <h1 style={{fontFamily: 'Roboto, sans-serif'}} className='welcome-text'>Welcome back {first_name}! Here is your (responsive) résumé.</h1>
      <div className='intro'>
        <div className='intro__avatar'>
          <img src={profile_img_url} />
        </div>
        <Card className='intro__text'>
          <CardTextWithStyles className='intro__text-container'>
            <h1 className='intro__text-title'>{full_name}</h1>
            <div className='intro__text-summary'>
              <div className='intro__text-label'>Summary</div>
              {summary}
            </div>
            <div className='intro__text-education'>
              <div className='intro__text-label'>Education</div>
              {education}
            </div>
          </CardTextWithStyles>
        </Card>
      </div>

      <Card>
        <CardHeaderWithStyles title='Work Experience' />
        <CardTextWithStyles>
          {work_experience.map((props, i) => {
            return (<WorkExperience key={i} {...props} />)
          })}
        </CardTextWithStyles>
      </Card>
      <div className='secondary-cards-container'>
        <Card className='secondary-card'>
          <CardHeaderWithStyles title='Academic Projects' />
          <CardTextWithStyles>
            <ul>
              {academic_projects.map((project, i) => {
                return (<li key={i}>{project}</li>)
              })}
            </ul>
          </CardTextWithStyles>
        </Card>
        <Card className='secondary-card'>
          <CardHeaderWithStyles title='Awards' />
          <CardTextWithStyles>
            <ul>
              {awards.map((award, i) => {
                return (<li key={i}>{award}</li>)
              })}
            </ul>
          </CardTextWithStyles>
        </Card>
        <Card className='secondary-card secondary-card--skills'>
          <CardHeaderWithStyles title='Skills' />
          <CardTextWithStyles style={{padding: '0 16px'}}>
            {skills.map(({category, skills}, i) => {
              return (<SkillCategory key={i} category={category} skills={skills} />)
            })}
          </CardTextWithStyles>
        </Card>
      </div>
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return {
    user: user.user
  }
}

export default connect(mapStateToProps)(Home)
/* eslint-enable camelcase */
