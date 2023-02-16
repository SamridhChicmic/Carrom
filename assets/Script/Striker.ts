import {
  _decorator,
  Component,
  Node,
  tween,
  Input,
  UITransform,
  Size,
  Vec3,
  EventTouch,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Striker")
export class Striker extends Component {
  @property(Node)
  targetarea = null;
  @property(Node)
  Hover = null;
  @property(Node)
  Rotate_Hover = null;
  @property(Node)
  Arrow = null;
  startposition: Vec3;
  onLoad() {
    // touch start
    this.node.on(
      Input.EventType.TOUCH_START,
      (event) => {
        this.startposition = event.getUILocation();
        this.Hover.active = false;
        this.Rotate_Hover.active = false;
        this.Arrow.active = true;
      },
      this
    );

    // touch move
    this.node.on(
      Input.EventType.TOUCH_MOVE,
      (event: EventTouch) => {
        let currentposition = event.getUILocation();

        console.log(currentposition);
        console.log(this.node.getWorldPosition());

        // distance
        let diffX = Math.pow(currentposition.x - this.startposition.x, 2);
        let diffY = Math.pow(currentposition.y - this.startposition.y, 2);
        let distance = Math.sqrt(diffX + diffY);

        // range set
        if (distance * 0.02 < 0.3) {
          this.targetarea.setScale(distance * 0.02, distance * 0.02);
          this.Arrow.setScale(distance * 0.15, distance * 0.15);
        }

        let dY = event.getUILocation().y - this.node.getWorldPosition().y;
        let dX = event.getUILocation().x - this.node.getWorldPosition().x;
        let angleInRadian = Math.atan2(dY, dX);
        let angleInDegree = (angleInRadian * 180) / Math.PI;
        this.targetarea.angle = angleInRadian * 90;
        // this.Arrow.angle = angleInDegree - 90;

        console.log("Radian : ", angleInRadian, " Degree: ", angleInDegree);
        //console.log(Math.atan2(diffY, diffX));
      },
      this
    );

    // touch end
    this.node.on(
      Input.EventType.TOUCH_END,
      (event) => {
        this.Hover.active = true;
        this.Rotate_Hover.active = true;
        this.Arrow.active = false;
        this.targetarea.setScale(0, 0);
      },
      this
    );

    // touch cancel
    this.node.on(
      Input.EventType.TOUCH_CANCEL,
      (event) => {
        this.Hover.active = true;
        this.Rotate_Hover.active = true;
        this.Arrow.active = false;
        this.targetarea.setScale(0, 0);
      },
      this
    );
  }
  start() {}

  update(deltaTime: number) {}
}
