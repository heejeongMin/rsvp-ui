export class GuestRSVPRequest {
  path: string;
  options: string;
  name: string;
  message: string;

  constructor(path: string, form) {
    this.path = path;
    this.options = form.getFieldValue("rsvp");
    this.name = form.getFieldValue("name");
    this.message = form.getFieldValue("message");
  }
}
