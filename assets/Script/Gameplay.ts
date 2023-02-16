import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  SpriteFrame,
  JsonAsset,
  UITransform,
} from "cc";
// enum file pluck type
import { PluckType } from "./Constant";
// pluck script
import { coinPrefab } from "./PluckPrefab";
const { ccclass, property } = _decorator;

@ccclass("Gameplay")
export class Gameplay extends Component {
  // pluck prefab
  @property(Prefab)
  prefab: Prefab = null;

  // pluck pattern
  @property({ type: JsonAsset })
  plucktype: JsonAsset = null;
  NODE: Node;
  onLoad() {
    // for width and height in pattern making
    this.NODE = instantiate(this.prefab);
    // pattern making call
    this.pattern();
  }

  pattern() {
    let pluck: any = this.plucktype?.json;
    pluck = pluck.pluckindex;

    console.log(pluck.length + " pluck json length");
    let pluckwidth = this.NODE.getComponent(UITransform).width;
    // starting position
    let width = -pluckwidth * 0.5;
    // starting height
    let height = pluckwidth * 3;
    let count = 2;
    // iska kaam setPosition m h position m
    let space = pluckwidth + 1;
    let index = 0;
    for (let i = 0; i < 5; i++) {
      // haar row k baad height minus
      height -= pluckwidth;
      if (i < 3) {
        // starting se width minus
        width -= pluckwidth * 0.5;
        count++;
        for (let j = 0; j < count; j++) {
          let node = instantiate(this.prefab);
          if (pluck[index].type == "PluckType.Black") {
            node.getComponent(coinPrefab).decideColor(PluckType.Black);
          } else if (pluck[index].type == "PluckType.White") {
            node.getComponent(coinPrefab).decideColor(PluckType.White);
          } else {
            node.getComponent(coinPrefab).decideColor(PluckType.Red);
          }
          // let Node = this.pluckArray.splice(
          //   Math.random() * this.pluckArray.length,
          //   1
          // );
          node.setPosition(width + space * j, height);
          this.node.getChildByName("Board").addChild(node);
          index++;
        }
      } else {
        --count;
        width += pluckwidth * 0.5;
        for (let j = 0; j < count; j++) {
          let node = instantiate(this.prefab);
          if (pluck[index].type == "PluckType.Black") {
            node.getComponent(coinPrefab).decideColor(PluckType.Black);
          } else if (pluck[index].type == "PluckType.White") {
            node.getComponent(coinPrefab).decideColor(PluckType.White);
          } else {
            node.getComponent(coinPrefab).decideColor(PluckType.Red);
          }
          // let Node = this.pluckArray.splice(
          //   Math.random() * this.pluckArray.length,
          //   1
          // );
          node.setPosition(width + space * j, height);
          this.node.getChildByName("Board").addChild(node);
          index++;
        }
      }
    }
  }
  start() {}

  update(deltaTime: number) {}
}

//****** array se random pick krke pattern m dalna ho

//  {
//   on load

// this.addPluck(9, PluckType.Black);
// this.addPluck(1, PluckType.Red);
// this.addPluck(9, PluckType.White);
//  }

// pluckArray: Node[] = [];
// addPluck(Number: number, PluckType: PluckType) {
//   for (let no = 0; no < Number; no++) {
//     let pluck = instantiate(this.prefab);
//     pluck.getComponent(coinPrefab).decideColor(PluckType);
//     this.pluckArray.push(pluck);
//   }
// }
