import {
  _decorator,
  Component,
  Node,
  director,
  Input,
  Button,
  UITransform,
  EditBox,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("SignUp")
export class SignUp extends Component {
  @property(Node)
  AlreadyUser: Node = null;
  @property(Node)
  Details: Node[] = [null, null, null, null, null, null];
  userValidation(
    username: string,
    mail: string,
    password: string,
    mobile: string
  ) {
    let Expname = /^[a-z\d]{5,12}$/;
    let Expmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    let Exppassword = /^[#\w@_-]{8,20}$/;
    let Expmobile = /^[7-9][0-9]{9}$/;
    if (!Expname.test(username)) {
      console.log("Invalid user name");
    }
    if (!Expmobile.test(mobile)) {
      console.log("Invalid mobile");
    }
    if (!Expmail.test(mail)) {
      console.log("Invalid mail");
    }
    if (!Exppassword.test(password)) {
      console.log("Invalid password");
    }
  }
  signUp() {
    console.log("SignUp Clicked");
    let UserName = this.Details[0].getComponent(EditBox).string;
    let Mail = this.Details[1].getComponent(EditBox).string;
    let Password = this.Details[2].getComponent(EditBox).string;
    let Moblie = this.Details[3].getComponent(EditBox).string;
    let Gender = this.Details[4].getComponent(EditBox).string;
    let Country = this.Details[5].getComponent(EditBox).string;

    console.log(
      UserName,
      " ",
      Mail,
      " ",
      Password,
      " ",
      Gender,
      " ",
      Moblie,
      " ",
      Country,
      " "
    );
    this.userValidation(UserName, Mail, Password, Moblie);
  }
  logIn() {
    console.log("Directed to Login Page");
    director.loadScene("LoginScene");
  }
  onLoad() {
    this.AlreadyUser.on(Input.EventType.TOUCH_START, this.logIn, this);
  }
  start() {}

  update(deltaTime: number) {}
}
