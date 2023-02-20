import { _decorator, Component, Node, Input, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Login")
export class Login extends Component {
  @property(Node)
  NewUser: Node = null;
  signUp() {
    console.log("Directed to SignUp Page");
    director.loadScene("UserValidation");
  }
  onLoad() {
    this.NewUser.on(Input.EventType.TOUCH_START, this.signUp, this);
  }
  start() {}

  update(deltaTime: number) {}
}
