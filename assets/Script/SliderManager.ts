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
  striker: Node = null;
  @property(Node)
  hover_green: Node = null;

  twidth = 150;
  width = -70;

  CurrentProgress: number;
  move() {
    console.log("moved", this.node.getParent().getComponent(Slider).progress);

    this.striker.setPosition(
      this.width +
        this.twidth * this.node.getParent().getComponent(Slider).progress,
      this.striker.getPosition().y,
      0
    );
  }
  onLoad() {
    // touch start
    this.node.on(
      Input.EventType.TOUCH_START,
      () => {
        console.log("start");
        this.hover_green
          .getComponent(UITransform)
          .setContentSize(new Size(40, 40));
      },
      this
    );

    // touch end
    this.node.on(
      Input.EventType.TOUCH_END,
      () => {
        console.log("end");
        this.hover_green
          .getComponent(UITransform)
          .setContentSize(new Size(60, 60));
      },
      this
    );

    // touch cancel
    this.node.on(
      Input.EventType.TOUCH_CANCEL,
      () => {
        console.log("cancel");
        this.hover_green
          .getComponent(UITransform)
          .setContentSize(new Size(60, 60));
      },
      this
    );

    // moving slider
    this.node.getParent().on("slide", this.move, this);
  }
  start() {}

  update(deltaTime: number) {}
}
