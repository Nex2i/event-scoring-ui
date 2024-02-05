import { IBaseModel } from '../base.model';
import { ProjectModel } from '../project/project.model';

export interface UserModel extends IBaseModel {
  email: string;
  authId: string;
  userName: string;
  id: string;
  token: string;
  picture: string;
  projects: ProjectModel[];
}
