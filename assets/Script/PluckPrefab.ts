import { _decorator, Component, Node, SpriteFrame, Sprite } from "cc";
import { PluckType } from "./Constant";
const { ccclass, property } = _decorator;

@ccclass("coinPrefab")
export class coinPrefab extends Component {
  @property({ type: SpriteFrame })
  red = null;
  @property({ type: SpriteFrame })
  white = null;
  @property({ type: SpriteFrame })
  black = null;

  plucktype: PluckType = PluckType.None;
  start() {}

  decideColor(PLUCKTYPE: PluckType) {
    switch (PLUCKTYPE) {
      case PluckType.Black:
        this.plucktype = PluckType.Black;
        this.node.getComponent(Sprite).spriteFrame = this.black;
        break;
      case PluckType.White:
        this.plucktype = PluckType.White;
        this.node.getComponent(Sprite).spriteFrame = this.white;
        break;
      case PluckType.Red:
        this.plucktype = PluckType.Red;
        this.node.getComponent(Sprite).spriteFrame = this.red;
    }
  }
  update(deltaTime: number) {}
}
