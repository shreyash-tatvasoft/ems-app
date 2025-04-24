"use client"

import React, { useState } from 'react'

// Common constatns
import { PROFILE_TAB_OPTIONS } from '@/utils/constant';

// Helper Function imports
import { TAB_OPTIONS, InitialChangePasswordFormValues, ChangePasswordSchema } from './helper';

// Third-party Libraries
import { Formik, Form, FormikHelpers } from "formik";

// Custom components
import FormikTextField from "@/components/common/FormikTextField";

// Icons
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


// Types
import { IChangePasswordFormValues } from './types';

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState(TAB_OPTIONS.PERSONAL);
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
      
      const togglePasswordVisibility = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
      };


      const handleChangePasswordSubmit = async (
          values: IChangePasswordFormValues,
          actions: FormikHelpers<IChangePasswordFormValues>
        ) => {
          actions.setSubmitting(true);
          actions.resetForm();
          actions.setSubmitting(false);
        }

    return (
      <div className="mx-auto p-10">
        <div className="rounded-[12px] bg-white min-h-60 p-5">
          <div className="w-full mx-auto ">
            {/* Tabs Start  */}
            <div className="flex border-b">
              {PROFILE_TAB_OPTIONS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-2 text-md cursor-pointer flex-1 text-center font-bold focus:outline-none transition-colors duration-200 ${
                    activeTab === tab.value
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tabs Ends */}

            <div className="mt-6">
              {/* Personal Info Tab Start */}
              {activeTab === TAB_OPTIONS.PERSONAL && (
                <div>Here’s the Personal Information content.</div>
              )}
              {/* Personal Info Tab End */}

              {/* Update Email tab Start  */}
              {activeTab === TAB_OPTIONS.EMAIL && (
                <div>Here’s the Email Change content.</div>
              )}
              {/* Update Email tab End  */}

              {/* Password Update Tab Start */}
              {activeTab === TAB_OPTIONS.PASSWORD && (
                <div className="p-2">
                  <Formik
                    initialValues={InitialChangePasswordFormValues}
                    validationSchema={ChangePasswordSchema}
                    onSubmit={handleChangePasswordSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-5">
                        <FormikTextField
                          name="oldPassword"
                          label="Old Password"
                          type={showPassword.oldPassword ? "text" : "password"}
                          placeholder="Enter your old password"
                          endIcon={
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("oldPassword")
                              }
                              className="text-gray-500 cursor-pointer"
                            >
                              {showPassword.oldPassword ? (
                                <EyeSlashIcon className="h-6 w-6 text-gray-500 mt-1" />
                              ) : (
                                <EyeIcon className="h-6 w-6 text-gray-500 mt-1" />
                              )}
                            </button>
                          }
                        ></FormikTextField>

                        <FormikTextField
                          name="newPassword"
                          label="New Password"
                          type={showPassword.newPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          endIcon={
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("newPassword")
                              }
                              className="text-gray-500 cursor-pointer"
                            >
                              {showPassword.newPassword ? (
                                <EyeSlashIcon className="h-6 w-6 text-gray-500 mt-1" />
                              ) : (
                                <EyeIcon className="h-6 w-6 text-gray-500 mt-1" />
                              )}
                            </button>
                          }
                        ></FormikTextField>

                        <FormikTextField
                          name="confirmPassword"
                          label="Confirm New Password"
                          placeholder="Enter your confirm new password"
                          type={
                            showPassword.confirmPassword ? "text" : "password"
                          }
                          endIcon={
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("confirmPassword")
                              }
                              className="text-gray-500 cursor-pointer"
                            >
                              {showPassword.confirmPassword ? (
                                <EyeSlashIcon className="h-6 w-6 text-gray-500 " />
                              ) : (
                                <EyeIcon className="h-6 w-6 text-gray-500 " />
                              )}
                            </button>
                          }
                        />

                        <div className="text-end">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold py-3 px-5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer mt-3 mb-2"
                          >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
              {/* Password Update Tab End */}
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserProfilePage