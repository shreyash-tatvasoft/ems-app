"use client"

import React from 'react'
import { Formik, Form, FormikHelpers } from "formik";
import FormikTextField from '@/app/components/common/FormikTextField'

function CreateEventpage() {
    return (
        <div className='m-5'>
            <div className='rounded-[12px] bg-white p-5'>
                <p className='text-2xl font-bold mb-10'>Create Event</p>

                <Formik
                   initialValues={{ title : ""}}
                   onSubmit={() => console.log("first")}
                >
                <Form className='space-y-4'>
                    <FormikTextField
                        label='Title'
                       name='title'
                       type='text'
                       placeholder='Enter event title'
                    />
                </Form>
                </Formik>

                
            </div>
        </div>
    )
}

export default CreateEventpage