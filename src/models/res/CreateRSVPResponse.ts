import { IResponse } from "./ResponseWapper";

export class GetRSVPResponse implements IResponse {
  name: string;
  link: string;
  email: string;
  startOn: string;
  endOn: string;
  location: string;
  options: string[];
  timeLimit: string;
  description: string;
}
