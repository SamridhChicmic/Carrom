import {
  _decorator,
  Component,
  Node,
  Slider,
  Input,
  UITransform,
  Size,
  tween,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("SliderManager")
export class SliderManager extends Component {
  @property(Node)
  striker = null;

  CurrentProgress: number;
  move() {
    console.log("moved");
    let twidth = 150;
    let width = -75;

    this.striker.setPosition(
      width + twidth * this.node.getParent().getComponent(Slider).progress,
      this.striker.getPosition().y
    );
  }
  onLoad() {
    this.striker.getChildByName("Arrow").active = false;
    let Rotation = this.striker.getChildByName("Rotate_Hover");
    tween(Rotation).by(1, { angle: -360 }).repeatForever().start();
    this.node.on(
      Input.EventType.TOUCH_START,
      () => {
        console.log("start");
        this.striker
          .getChildByName("Hover")
          .getComponent(UITransform)
          .setContentSize(new Size(40, 40));
      },
      this
    );
    this.node.on(
      Input.EventType.TOUCH_END,
      () => {
        console.log("end");
        this.striker
          .getChildByName("Hover")
          .getComponent(UITransform)
          .setContentSize(new Size(60, 60));
      },
      this
    );
    this.node.on(
      Input.EventType.TOUCH_CANCEL,
      () => {
        console.log("cancel");
        this.striker
          .getChildByName("Hover")
          .getComponent(UITransform)
          .setContentSize(new Size(60, 60));
      },
      this
    );
    this.node.getParent().on("slide", this.move, this);
  }
  start() {}

  update(deltaTime: number) {}
}
