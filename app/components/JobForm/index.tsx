'use client';

import React, { useState } from 'react';
import { JobDescription } from '@/app/types';

type JobFormProps = {
  onSubmit: (jobDescription: JobDescription) => void;
}

const JobForm = ({onSubmit}: JobFormProps) => {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const jobData: JobDescription = {
      title,
      companyName,
      skillsRequired: skillsRequired.split(',').map((s) => s.trim()).filter(Boolean),
    }

    onSubmit(jobData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded flex flex-col">
      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="p-2 border rounded outline-none focus:border-blue-500 mb-2 w-full text-black"
      />
      <input
        required
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Company Name"
        className="p-2 border rounded outline-none focus:border-blue-500 mb-2 w-full text-black"
      />
      <input
        required
        value={skillsRequired}
        onChange={(e) => setSkillsRequired(e.target.value)}
        placeholder="Skills Required"
        className="p-2 border rounded outline-none focus:border-blue-500 mb-2  w-full text-black"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors">
        Tạo Cover Letter
      </button>
    </form>
  );
}

export default JobForm;