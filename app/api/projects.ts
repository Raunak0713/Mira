// pages/api/projects/create.ts

import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { createProject } from '@/actions/projects'; // Assume this is the function to create a project

const createProjectHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = getAuth(req);  // Extract user ID from Clerk's authentication

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });  // If user is not authenticated
  }

  if (req.method === 'POST') {
    try {
      const projectData = req.body;

      // Assuming you are checking if the user is an admin somewhere in the project creation logic
      const project = await createProject(projectData); // Pass the userId for additional validation (if needed)
      return res.status(200).json(project); // Return the created project
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create project' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};

export default createProjectHandler;
