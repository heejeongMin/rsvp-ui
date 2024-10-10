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
  responders: RespondersRes[];
}

export class RespondersRes {
  name: string;
  option: string;
  message: string;
}

export const convertOption = (option: string) => {
  switch (option) {
    case "Y":
      return "참가";
    case "YN":
      return "미정";
    case "N":
      return "불참";
    default:
      return option;
  }
};
