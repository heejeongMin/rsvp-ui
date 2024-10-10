export class GuestRSVPRequest {
  path: string;
  option: string;
  name: string;
  message: string;

  constructor(path: string, form) {
    this.path = path;
    this.option = form.getFieldValue("rsvp");
    this.name = form.getFieldValue("name");
    this.message = form.getFieldValue("message");
  }
}
