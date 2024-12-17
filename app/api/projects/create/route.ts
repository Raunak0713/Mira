// /app/api/projects/create/route.ts
import { createProject } from '@/actions/projects';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const project = await createProject(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error in /api/projects/create:", error);
    return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
  }
}
