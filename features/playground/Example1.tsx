'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

const Example1 = () => {

    const formSchema = z.object({
        username: z.string().min(2, {
            message: 'Username must be at least 2 charecters'
        }),
        email: z.string().email('Invalid email!'),
        gender: z.enum(['male', 'female', 'other'], {
            errorMap: () => ({ message: 'Gender is required' })
        }),
        address: z.object({
            street: z.string().min(1, 'Street is required'),
            city: z.string().min(1, 'City is required'),
            state: z.string().min(1, 'State is required'),
            zip: z
                .string()
                .min(4, 'Zip Code must be at least 4 digits')
                .max(10, 'Zip Code must be at most 10 digits'),
        }),
        jobTitle: z.string().min(1, 'Job Title is required'),
        department: z.enum(['engineering', 'marketing', 'sales', 'hr', 'finance'], {
            errorMap: () => ({ message: 'Department is required' }),
        }),
        salary: z.string().min(1, 'Salary is required'),

        bio: z.string().optional(),
        terms: z.boolean().refine((val) => val === true, {
            message: 'You must accept the terms and conditions',
        }),

    });

    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                username: '',
                email: '',
                gender: 'male',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                },
                jobTitle: '',
                department: 'engineering',
                salary: '0',

                bio: '',
                terms: false,
            }
        }
    )

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log({ values });
        alert(JSON.stringify(values))
    }

    return (
        <div className="border p-3 w-[70%] mx-auto mt-4 rounded-2xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="username"
                        render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Usernme</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Username" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="jon@gmail.com" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-row"
                                    >
                                        {['Male', 'Female', 'Other'].map((gender) => (
                                            <FormItem
                                                key={gender}
                                                className="flex items-center space-x-1 space-y-0"
                                            >
                                                <FormControl>
                                                    <RadioGroupItem value={gender.toLowerCase()} />
                                                </FormControl>
                                                <FormLabel className="font-normal">{gender}</FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    <div className="grid grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="address.street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="address.state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address.zip"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
					<FormField
						control={form.control}
						name="jobTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Job Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="department"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Department</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a department" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'].map(
											(department) => (
												<SelectItem
													key={department}
													value={department.toLowerCase()}
												>
													{department}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

                <FormField
						control={form.control}
						name="salary"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Salary</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

                    <FormField
                        control={form.control}
                        name="bio"
                        render={
                            ({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write Here..." {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }
                    />

<FormField
					control={form.control}
					name="terms"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>
								I agree to the{' '}
								<a href="#" className="text-primary">
									terms and conditions
								</a>
							</FormLabel>
						</FormItem>
					)}
				/>


                    <Button type="submit">Submit</Button>

                </form>
            </Form>
        </div>
    )
}

export default Example1;