export interface JobDescription {
  title: string;
  companyName: string;
  skillsRequired: string[];
}

export type CoverLetterStatus = 'pending' | 'success' | 'failed';
