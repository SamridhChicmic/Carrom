import {
  _decorator,
  Component,
  Node,
  BoxCollider2D,
  Contact2DType,
  Collider2D,
  IPhysics2DContact,
  RigidBody2D,
  Vec3,
  Vec2,
  tween,
} from "cc";
import { Score } from "./Score";
import { coinPrefab } from "./PluckPrefab";
const { ccclass, property } = _decorator;

@ccclass("Holes")
export class Holes extends Component {
  @property(Node)
  Hole1: Node = null;
  @property(Node)
  Hole2: Node = null;
  @property(Node)
  Hole3: Node = null;
  @property(Node)
  Hole4: Node = null;
  @property(Node)
  Striker: Node = null;

  Player1Score: Score = new Score();
  Player2Score: Score = new Score();
  Destroy(node: Node, Player: Score) {
    node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
    if (node.name != this.Striker.name) {
      //node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
      //  tween(node).by(1, { angle: -360 }).repeatForever().start();
      Player.increaseScore(node.getComponent(coinPrefab).plucktype);
      console.log("Score", Player.Score);
      setTimeout(() => {
        node.destroy();
      }, 1000);
    } else {
      Player.decreaseScore();
      console.log("Score", Player.Score);
    }
  }

  detectCollision = (self, other) => {
    console.log(self.name, "Other ", other.name);
    this.Destroy(other.node, this.Player1Score);
  };
  onLoad() {
    let ColliderH1 = this.Hole1.getComponent(Collider2D);
    let ColliderH2 = this.Hole2.getComponent(Collider2D);
    let ColliderH3 = this.Hole3.getComponent(Collider2D);
    let ColliderH4 = this.Hole4.getComponent(Collider2D);

    ColliderH1.on(Contact2DType.BEGIN_CONTACT, this.detectCollision);

    ColliderH2.on(Contact2DType.BEGIN_CONTACT, this.detectCollision);
    ColliderH3.on(Contact2DType.BEGIN_CONTACT, this.detectCollision);
    ColliderH4.on(Contact2DType.BEGIN_CONTACT, this.detectCollision);
  }
  start() {}

  update(deltaTime: number) {}
}
