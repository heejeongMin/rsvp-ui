import { GetRSVPResponse } from "./GetRSVPResponse";
import { PageInfo } from "./PageInfo";
import { IResponse } from "./ResponseWapper";

export class GetHistoryRSVPResponse implements IResponse {
  rsvp: GetRSVPResponse[];
  pageInfo: PageInfo;
}
