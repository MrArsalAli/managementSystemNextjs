import DoctorForm from "@/components/ApplyForm";
import { auth } from "../../../../auth";

export default async function AppyAsADoctor() {
  const session = await auth()
  return (
    <div className="min-h-screen container mx-auto">
      <h1 className="font-bold text-2xl my-4">Apply As A Doctor</h1>
      <p className="my-6">
        To apply for a specialty role you can check the person specification
        for the role you are interested in. This will give you an idea of the
        skills knowledge and abilities that recruiters are looking for.This
        will give you an idea of the skills knowledge and abilities that
        recruiters are looking for.This will give you an idea of the skills
        knowledge and abilities that recruiters are looking for.This will give
        you an idea of the skills knowledge and abilities that recruiters are
        looking for.
      </p>

      <DoctorForm session={session} />
    </div>
  );
}
