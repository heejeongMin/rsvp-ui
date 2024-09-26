import { GetRSVPResponse } from "./GetRSVPResponse";
import { PageInfo } from "./PageInfo";

export class GetHistoryRSVPResponse {
  rsvp: GetRSVPResponse[];
  pageInfo: PageInfo;
}
