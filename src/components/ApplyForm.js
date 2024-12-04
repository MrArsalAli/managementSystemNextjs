"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useCallback } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addRequest } from "@/actions/requests";
import { useToast } from "@/hooks/use-toast";

// Define Zod schema
const formSchema = z.object({
  bio: z.string().min(2, "Bio must be at least 2 characters").max(120),
  hospital: z
  .string()
  .min(2, "Hospital name must be at least 2 characters")
  .max(50),
  fees: z.string(),
  gender: z.string(),
  appointmentTime: z.string(),
  degree: z.string(),
  specialization: z.string(),
  experience: z.string(),
  number: z.string().min(3, "Invalid phone number").max(15),
  address: z.string(),
  // days: z.array(z.string()).nonempty("At least one day is required"),
  // profileImg: z.string().url("Invalid image URL"),
  // name: z.string().min(2, "Name must be at least 2 characters").max(50),
  // email: z.string().email("Invalid email address"),
});

export default function DoctorForm({ session }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
      hospital: "",
      fees: "",
      gender: "",
      appointmentTime: "",
      degree: "",
      specialization: "",
      experience: "",
      number: "",
      address: "",
      // profileImg: "",
      // days: [],
      // name: "",
      // email: "",
    },
  });

  // const onDrop = useCallback((acceptedFiles) => {
  //   // Do something with the files
  // }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  async function onSubmit(values) {
    values.user = session.user._id;
    const response = await addRequest(values);
    if (response.error) {
      form.reset(),
        toast({
          title: "You had Submitted before! Wait",
          description: response.msg,
        });
    } else {
      form.reset(),
        toast({
          title: "Your Request is Submitted",
          description: "You will be informed in 3 working days",
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6">
          {/* Hospital */}
          <FormField
            control={form.control}
            name="hospital"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital</FormLabel>
                <FormControl>
                  <Input placeholder="Hospital name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Appointment Time  */}
          <FormField
            name="appointmentTime"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Degree */}
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="Degree" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Specialization */}
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <Input placeholder="Specialization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input placeholder="Experience" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fees */}
          <FormField
            control={form.control}
            name="fees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fees</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Fees" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input placeholder="Gender" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter a short bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profile Image */}
        {/* <UploadImage /> */}

        <div className="my-4">
          <Button type="submit">
            {form.formState.isSubmitting ? "Loading" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
