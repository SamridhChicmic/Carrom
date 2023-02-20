import { _decorator, Component, Node, director, Input } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SignUp")
export class SignUp extends Component {
  @property(Node)
  AlreadyUser: Node = null;
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
