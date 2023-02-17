import {
  _decorator,
  Component,
  Node,
  BoxCollider2D,
  Contact2DType,
  Collider2D,
  IPhysics2DContact,
} from "cc";
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

  Destroy(node: Node) {
    if (node.name != this.Striker.name) {
      setTimeout(() => {
        node.destroy();
      }, 0);
    }
  }
  CollisionCatch(
    ColliderH1: Collider2D,
    ColliderH2: Collider2D,
    ColliderH3: Collider2D,
    ColliderH4: Collider2D
  ) {
    if (ColliderH1) {
      ColliderH1.on(Contact2DType.BEGIN_CONTACT, (self, other) => {
        console.log(self.name, "Other ", other.name);
        this.Destroy(other.node);
      });
    }
    if (ColliderH2) {
      ColliderH2.on(
        Contact2DType.BEGIN_CONTACT,
        (self, other) => {
          console.log(self.name, "Other ", other.name);
          this.Destroy(other.node);
        },
        this
      );
    }
    if (ColliderH3) {
      ColliderH3.on(
        Contact2DType.BEGIN_CONTACT,
        (self, other) => {
          console.log(self.name, "Other ", other.name);
          this.Destroy(other.node);
        },
        this
      );
    }
    if (ColliderH4) {
      ColliderH4.on(
        Contact2DType.BEGIN_CONTACT,
        (self, other) => {
          console.log(self.name, "Other ", other.name);
          this.Destroy(other.node);
        },
        this
      );
    }
  }
  onLoad() {
    let ColliderH1 = this.Hole1.getComponent(Collider2D);
    let ColliderH2 = this.Hole2.getComponent(Collider2D);
    let ColliderH3 = this.Hole3.getComponent(Collider2D);
    let ColliderH4 = this.Hole4.getComponent(Collider2D);

    this.CollisionCatch(ColliderH1, ColliderH2, ColliderH3, ColliderH4);
  }
  start() {}

  update(deltaTime: number) {}
}
