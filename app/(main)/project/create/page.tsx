"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/app/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import { OrgSwitcher } from "@/components/org-switcher";
import { z } from "zod";
import { toast } from "sonner";

type ProjectData = z.infer<typeof projectSchema>;

export default function CreateProjectPage() {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const onSubmit = async (data: ProjectData) => {
    if (!isAdmin) {
      toast.error("Only organization admins can create projects ❌");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error response from API:", result); // Log the error response from the API
        setError(result.message || "Failed to create project");
      } else {
        toast.success("Project Created Successfully ✅")
        router.push(`/project/${result.id}`);
      }
    } catch (err: any) {
      console.error("Error during project creation:", err); // Log the caught error
      setError("An error occurred while creating the project.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOrgLoaded || !isUserLoaded) {
    return null; // Loading state
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl gradient-title">
          Oops! Only Admins can create projects.
        </span>
        <OrgSwitcher />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <div>
          <Input
            id="name"
            {...register("name")}
            className="bg-slate-950"
            placeholder="Project Name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Input
            id="key"
            {...register("key")}
            className="bg-slate-950"
            placeholder="Project Key (Ex: RCYT)"
          />
          {errors.key && <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>}
        </div>

        <div>
          <Textarea
            id="description"
            {...register("description")}
            className="bg-slate-950 h-28"
            placeholder="Project Description"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {loading && <BarLoader className="mb-4" width="100%" color="#36d7b7" />}

        <Button type="submit" size="lg" disabled={loading} className="bg-blue-500 text-white">
          {loading ? "Creating..." : "Create Project"}
        </Button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
