
export class SankeyUser {
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public password: string;
  public address: string;
  public city: string;
  public phoneNo: number;
  public userType: string;
  public hobbies: any;

  constructor(firstName: string, lastName: string, username: string, email: string, password: string, address: string, city: string, phoneNo: number, userType: string, hobbies: any) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.address = address;
    this.city = city;
    this.phoneNo = phoneNo;
    this.userType = userType;
    this.hobbies = hobbies
  }
}
