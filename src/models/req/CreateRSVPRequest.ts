export class CreateRSVPRequest {
  name: string;
  email: string;
  startOn: string;
  endOn: string;
  location: string;
  options: string[];
  timeLimit: string;
  description: string;

  constructor(form) {
    this.name = form.getFieldValue("name");
    this.email = form.getFieldValue("email");
    this.startOn = form.getFieldValue("startDateAndTime");
    this.endOn = form.getFieldValue("endDateAndTime");
    this.location = form.getFieldValue("location");
    this.options = form.getFieldValue("rsvp");
    this.timeLimit = form.getFieldValue("rsvpDeadline");
    this.description = form.getFieldValue("description");
  }
}
