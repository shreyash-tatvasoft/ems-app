'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from "formik";
import { ROUTES } from '@/utils/constant';
import { SignupFormSchema } from '@/app/(auth)/sign-up/schema';
import { InitialSignupValues, ISignupFormValues, style, TITLE } from './helper';
import FormikTextField from '@/app/components/common/FormikTextField';
import Logo from '@/app/components/common/Logo';
import SignupImg from "../../../../public/signup_img.jpg"


function SignUpPage() {
    const router = useRouter()

    const handleSignupSubmit = (
        values: ISignupFormValues,
        actions: FormikHelpers<ISignupFormValues>
    ) => {
        console.log(values);
        actions.setSubmitting(false);
    };

    return (
        <section className='min-h-[100vh]'>
            <div className="p-5">
                <div className="flex flex-wrap -m-4 justify-between">

                    {/* LEFT - FORM PART */}
                    <div className="lg:w-1/2 w-full min-h-[100vh]">
                        <div className='max-w-fit'>
                            <Link href={ROUTES.HOME} >
                                <Logo />
                            </Link>
                        </div>
                        <div className="flex flex-col gap-[40px] px-8 sm:px-12 lg:px-20 py-10">
                            <div>
                                <h1 className="text-center text-3xl font-bold text-primary mb-2">{TITLE.FORM_TITLE}</h1>
                                <p className="text-center text-0.5xl">{TITLE.FORM_SUBTITLE}</p>
                            </div>
                            <div >
                                <Formik
                                    initialValues={InitialSignupValues}
                                    validationSchema={SignupFormSchema}
                                    onSubmit={handleSignupSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="space-y-4 max-h-[365px]">
                                            <FormikTextField
                                                label='Your Name'
                                                name='name'
                                                type='text'
                                                placeholder='Enter your name'
                                            />

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
                                                Create Account
                                            </button>

                                            <button
                                                type='button'
                                                className="cursor-pointer w-full bg-sidebar-border text-black font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
                                                onClick={() => { router.push(ROUTES.LOGIN) }}
                                            >
                                                Sign in
                                            </button>
                                        </Form>

                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT - IMAGE PART */}
                    <div className="py-5 lg:w-1/2 md:w-full rounded-[12px] min-h-[100vh]">
                        <Image
                            src={SignupImg}
                            className='rounded-[12px]'
                            alt='signup'
                            style={style.signupImgStyle} />
                    </div>
                </div>
            </div >
        </section >
    )
}

export default SignUpPage