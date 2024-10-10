import { GetRSVPResponse } from "./GetRSVPResponse";
import { IResponse } from "./ResponseWapper";

export class GetActiveRSVPListResponse implements IResponse {
  isActive: boolean;
  rsvp: GetRSVPResponse[];
}
