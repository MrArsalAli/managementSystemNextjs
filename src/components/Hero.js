import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex py-12 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              MANAGEMENT SYSTEM
              <br className="hidden lg:inline-block" />
              BY ARSALAN ALI
            </h1>
            <p className="mb-8 leading-relaxed ">
              Our Management System is a comprehensive solution designed to
              streamline operations, enhance productivity, and facilitate
              effective decision-making across various organizational functions.
              Tailored for businesses of all sizes, the system integrates key
              processes such as project management, resource allocation,
              performance tracking, and data analysis into a single,
              user-friendly platform.
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline">Find A Specialist</Button>
              <Link href={"/doctors/apply"}>
               <Button>Apply As A Doctor</Button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image
              width={500}
              height={1200}
              src={
                "https://images.pexels.com/photos/7048014/pexels-photo-7048014.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
