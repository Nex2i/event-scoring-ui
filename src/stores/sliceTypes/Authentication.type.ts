import { ProjectModel } from '@/types/models/project/project.model';

export interface IAuthenticationState {
  email: string;
  userName: string;
  authId: string;
  id: string;
  token: string;
  picture: string;
  projects: ProjectModel[];
}
