'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from "formik";
import { ROUTES } from '@/utils/constant';
import { InitialLogInValues, ILogInFormValues, style, TITLE } from './helper';
import { LogInFormSchema } from './schema';
import FormikTextField from '@/app/components/common/FormikTextField';
import Logo from '@/app/components/common/Logo';
import LogInImg from "../../../../public/login_img3.jpg"


function LogInPage() {
  const router = useRouter()

  const handleLogInSubmit = (
    values: ILogInFormValues,
    actions: FormikHelpers<ILogInFormValues>
  ) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <section>
      <div className="p-5">
        <div className="flex flex-wrap -m-4 justify-between">

          {/* LEFT - FORM PART */}
          <div className="lg:w-1/2 w-full">
            <div className='max-w-fit'>
              <Link href={ROUTES.HOME} >
                <Logo />
              </Link>
            </div>
            <div className="flex flex-col gap-[40px] px-8 sm:px-12 lg:px-20 py-20">
              <div>
                <h1 className="text-center text-3xl font-bold text-primary mb-2">{TITLE.FORM_TITLE}</h1>
                <p className="text-center text-0.5xl">{TITLE.FORM_SUBTITLE}</p>
              </div>
              <div >
                <Formik
                  initialValues={InitialLogInValues}
                  validationSchema={LogInFormSchema}
                  onSubmit={handleLogInSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4 max-h-[365px]">

                      <FormikTextField
                        label='Email'
                        name='email'
                        type='email'
                        placeholder='you@email.com'
                      />

                      <FormikTextField
                        label='Password'
                        name='password'
                        type='password'
                        placeholder='••••••••'
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer w-full bg-primary hover:bg-primary-foreground text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        Log In
                      </button>

                      <button
                        type='button'
                        className="cursor-pointer w-full bg-sidebar-border text-black font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
                        onClick={() => { router.push(ROUTES.SIGN_UP) }}
                      >
                        Sign Up
                      </button>
                    </Form>

                  )}
                </Formik>
              </div>
            </div>
          </div>

          {/* RIGHT - IMAGE PART */}
          <div className="py-5 lg:w-1/2 md:w-full rounded-[12px]">
            <Image
              src={LogInImg}
              className='rounded-[12px]'
              alt='login'
              style={style.loginImgStyle} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogInPage
