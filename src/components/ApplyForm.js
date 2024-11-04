"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UploadImage from "./UploadImage";
import { SelectItem } from "@radix-ui/react-select";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

// Define Zod schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  bio: z.string().min(2, "Bio must be at least 2 characters").max(120),
  hospital: z
    .string()
    .min(2, "Hospital name must be at least 2 characters")
    .max(50),
  days: z.array(z.string()).nonempty("At least one day is required"),
  fees: z.string().nonempty("Fees are required"),
  gender: z.enum(["Male", "Female", "Other"]),
  appointmentTime: z.string().nonempty("Appointment time is required"),
  degree: z.string().nonempty("Degree is required"),
  specialization: z.string().nonempty("Specialization is required"),
  experience: z.string().nonempty("Experience is required"),
  profileImg: z.string().url("Invalid image URL"),
  number: z.string().min(10, "Invalid phone number").max(15),
  email: z.string().email("Invalid email address"),
  address: z.string().nonempty("Address is required"),
});

export default function DoctorForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      hospital: "",
      days: [],
      fees: "",
      gender: "Other",
      appointmentTime: "",
      degree: "",
      specialization: "",
      experience: "",
      profileImg: "",
      number: "",
      email: "",
      address: "",
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Days */}
          <FormField
            name="days"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Days</FormLabel>

                <FormControl>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Your Days" />
                    </SelectTrigger>
                    <SelectContent
                      multiple
                      placeholder="Select days"
                      onChange={(selectedOptions) =>
                        field.onChange(
                          selectedOptions.map((option) => option.value)
                        )
                      }
                    >
                      <SelectItem className="cursor-pointer" value="Mon">
                        Mon
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Tue">
                        Tue
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Wed">
                        Wed
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Thu">
                        Thu
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Fri">
                        Fri
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Sat">
                        Sat
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Sun">
                        Sun
                      </SelectItem>
                    </SelectContent>
                  </Select>
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

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
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
        <UploadImage />

        <div className="my-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
