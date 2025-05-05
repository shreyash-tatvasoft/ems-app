import React from 'react'
import { NextPage } from 'next';

// custom compoents
import FaqsForm from '../../../../components/admin-components/FaqsForm'

// types 
import { IFaqsPage } from '../types';

const EventPage : NextPage<IFaqsPage> = async ( { params }) => {
  const faqMode = (await params).faqId;
  return (
    <div>
      <FaqsForm faqId={faqMode} />
    </div>
  )
}

export default EventPage