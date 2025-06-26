"use client";

import { FlexiForm, FlexiFormRef } from "@/components/form/flexiForm";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef } from "react";
import { z } from "zod";
import { ExperiencesFields } from "./ExperiencesFields";

const FormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  username: z.string().optional(),
  password: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  dob: z.date({
    message: "Invalid date",
  }),
  bio: z.string().optional(),
  terms: z
    .boolean()
    .refine((value) => value, { message: "You must agree to the terms" }),
  interests: z.array(z.string()).optional(),
  professionalExperiences: z
    .array(
      z.object({
        companyName: z.string().min(1, "Company name is required"),
        jobTitle: z.string().min(1, "Job title is required"),
        startDate: z.date({
          message: "Please enter a valid date",
        }),
        endDate: z.date({
          message: "Please enter a valid date",
        }),
        jobSummary: z.string().optional(),
      })
    )
    .optional(),
});

export type FormValues = z.infer<typeof FormSchema>;

const defaultValues: FormValues = {
  name: "",
  username: "",
  password: "",
  gender: "Male",
  terms: false,
  dob: new Date(),
  professionalExperiences: [],
};

const genderOptions = [
  { value: "Male", text: "Male" },
  { value: "Female", text: "Female" },
  { value: "Other", text: "Other" },
];

const interestsOptions = [
  { value: "Reading", text: "Reading" },
  { value: "Coding", text: "Coding" },
  { value: "Gaming", text: "Gaming" },
  { value: "Traveling", text: "Traveling" },
];

export const Example2 = () => {
  const formRef = useRef<FlexiFormRef<FormValues>>(null);

  return (
    <>
      <Card className="p-8 my-4 max-w-xl mx-auto">
        <FlexiForm
          schema={FormSchema}
          defaultValues={defaultValues}
          onSubmit={(values) => {
            console.log(values);
            alert(JSON.stringify(values));
          }}
          ref={formRef}
        >
          <div className="space-y-4">
            <FlexiForm.TextField<FormValues>
              name="name"
              label="Name"
              placeholder="Enter your name"
              required
              action={() => formRef.current?.setValue("name", "")}
            />

            <FlexiForm.UniqueTextField<FormValues>
              name="username"
              placeholder="username"
              label="Username"
              checkFunction={async () => false}
            />
            <FlexiForm.PasswordField<FormValues>
              name="password"
              placeholder="password"
              label="Password"
              required
              showStrength
              showMessage
            />

            <FlexiForm.RadioGroupField<FormValues>
              name="gender"
              options={genderOptions}
              required
            />

            <FlexiForm.DateField<FormValues>
              name="dob"
              label="Date of Birth"
              required
            />

            <FlexiForm.TextAreaField<FormValues>
              name="bio"
              label="Bio"
              placeholder="Enter your bio"
              autoResize
            />

            <FlexiForm.CheckboxGroupField<FormValues>
              name="interests"
              options={interestsOptions}
              label="Interests"
            />

            <ExperiencesFields />

            <FlexiForm.CheckboxField<FormValues>
              name="terms"
              label="I agree to the terms"
              required
            />

            <Button type="submit">Submit</Button>
          </div>
        </FlexiForm>
      </Card>
      {/* 
      <div className="mt-12 h-[750px] w-full overflow-y-auto bg-[#F2F2F2] mb-24">
        <BookingCalendarView />
      </div> */}
    </>
  );
};
