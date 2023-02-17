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
  math,
  EPhysics2DDrawFlags,
  PhysicsSystem2D,
  RigidBody2D,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Striker")
export class Striker extends Component {
  @property(Node)
  targetarea: Node = null!;
  @property(Node)
  Hover: Node = null!;
  @property(Node)
  Rotate_Hover: Node = null!;
  @property(Node)
  Arrow: Node = null!;
  startposition: Vec3;

  //try
  StrikerPermanentPos: Vec3;

  strikerMove(event) {
    // distance
    console.log("Striker Move");
    let currentposition = event.getUILocation();

    let diffX = currentposition.x - this.node.getWorldPosition().x;
    let diffY = currentposition.y - this.node.getWorldPosition().y;

    this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(
      -diffX * 0.5,
      -diffY * 0.5
    );

    console.log(diffX * 0.02, diffY * 0.02);
    console.log(this.node.getComponent(RigidBody2D).linearVelocity);
    // striker features
  }
  onLoad() {
    //  try
    this.StrikerPermanentPos = this.node.getPosition();
    //touch start
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

        // console.log(currentposition);
        // console.log(this.node.getWorldPosition());

        // distance
        let diffX = Math.pow(
          currentposition.x - this.node.getWorldPosition().x,
          2
        );
        let diffY = Math.pow(
          currentposition.y - this.node.getWorldPosition().y,
          2
        );
        let distance = Math.sqrt(diffX + diffY);

        // range set
        console.log(distance * 0.05, "Distance");
        if (distance * 0.05 < 0.3) {
          this.targetarea.setScale(distance * 0.05, distance * 0.05);
        }
        // arrow range
        if (distance * 0.05 < 0.5) {
          this.Arrow.setScale(distance * 0.15, distance * 0.15);
        }

        // arrow angle setting
        let dY = event.getUILocation().y - this.node.getWorldPosition().y;
        let dX = event.getUILocation().x - this.node.getWorldPosition().x;
        let angleInRadian = Math.atan2(dY, dX);
        let angleInDegree = (angleInRadian * 180) / Math.PI;
        if (angleInDegree < 0) {
          angleInDegree = 360 + angleInDegree;
        }
        console.log(" Degree1: ", angleInDegree);
        console.log(" Degree2: ", this.node.angle);

        this.Arrow.angle = angleInDegree + 90;
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
        // striker move
        this.strikerMove(event);
        this.Hover.active = false;
        this.Rotate_Hover.active = false;
        this.Arrow.active = false;
        this.targetarea.setScale(0, 0);
      },
      this
    );
  }

  start() {
    tween(this.Rotate_Hover).by(1, { angle: -360 }).repeatForever().start();
  }

  update(deltaTime: number) {
    let velocity = this.node.getComponent(RigidBody2D).linearVelocity;
    if (velocity.x <= 0 && velocity.y <= 0) {
      this.node.setPosition(this.StrikerPermanentPos);
    }
  }
}
