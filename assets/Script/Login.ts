import { _decorator, Component, Node, Input, director, EditBox } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Login")
export class Login extends Component {
  @property(Node)
  NewUser: Node = null;
  @property(Node)
  UserNameEdit: Node = null;
  @property(Node)
  PasswordEdit: Node = null;
  signUp() {
    console.log("Directed to SignUp Page");
    director.loadScene("UserValidation");
  }
  userValidation(username: string): Boolean {
    // user Validation
    // must conatain @
    let EmailExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (EmailExp.test(username)) {
      console.log("true Entry");
      return true;
    }
    console.log("false");
    return false;
  }
  postMethod(Body: object) {
    let method = "POST";
    let url = "http://3.18.231.59:4002/v1/user/login";
    let REQUEST = new XMLHttpRequest();
    REQUEST.open(method, url);
    REQUEST.setRequestHeader("Content-Type", "application/json");
    REQUEST.setRequestHeader(
      "apiKey",
      "HUMBLE_d59167bab8280dcvgs445g8a8af98cb428584676e_MINOR"
    );
    REQUEST.onreadystatechange = () => {
      if (REQUEST.readyState == 4) {
        console.log(REQUEST.response);
        console.log(REQUEST.status);
        console.log(REQUEST.statusText);
      }
    };
    console.log(JSON.stringify(Body));

    //let d = JSON.stringify(Body);
    REQUEST.send(JSON.stringify(Body));
    console.log("response");
  }

  login() {
    console.log("LOGIN START");
    let UserName = this.UserNameEdit.getComponent(EditBox).string;
    let Password = this.PasswordEdit.getComponent(EditBox).string;
    // let method = "POST";
    // let url = "http://3.18.231.59:4002/v1/user/login";
    let Body = {
      // email: "harpinder.singh@chicmic.co.in",
      // password: "12345678",
      email: UserName,
      password: Password,
    };
    if (this.userValidation(UserName)) {
      this.postMethod(Body);
    } else {
      console.log("Invalid Entry");
    }
  }
  onLoad() {
    this.NewUser.on(Input.EventType.TOUCH_START, this.signUp, this);
  }
  start() {}

  update(deltaTime: number) {}
}
