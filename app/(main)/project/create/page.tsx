'use client'

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from "@/app/lib/validators";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useOrganization, useUser } from "@clerk/nextjs";

type ProjectFormData = z.infer<typeof projectSchema>;

const CreateProjectPage = () => {
  const { isLoaded : isOrgLoaded, membership} = useOrganization()
  const { isLoaded : isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    const response = await fetch('/api/projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Project created successfully', result);
    } else {
      console.error('Error creating project', result.error);
    }
  };

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  if (!isAdmin) {
    return (
      <div>
        <span>Oops, only Admins can create projects!</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>

      <form
        className="w-full max-w-[600px] flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Input id="name" placeholder="Project Name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name?.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <Input
            id="key"
            placeholder="Project Key (Ex: RCYT)"
            {...register("key")}
          />
          {errors.key && (
            <p className="text-red-500 text-sm mt-1">
              {errors.key?.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <Textarea
            id="description"
            className="h-28"
            placeholder="Project Description"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description?.message?.toString()}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <Button variant={"secondary"} type="submit" size={"lg"} className="w-auto">
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectPage;
