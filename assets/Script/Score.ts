import { _decorator, Component, Node } from "cc";
import { PluckType } from "./Constant";
import { coinPrefab } from "./PluckPrefab";
const { ccclass, property } = _decorator;

@ccclass("Score")
export class Score extends Component {
  Score: number = 0;
  Turn: Boolean = false;
  Redin:Boolean=false;

  increaseScore(plucktype: PluckType) {
    if (PluckType.Red == plucktype) {
      this.Score += 20;
      this.Redin=true;
    } else {
      this.Score += 10;
    }
  }
  decreaseScore() {
    if (this.Score > 0) {
      this.Score -= 10;
    }
  }

  start() {}

  update(deltaTime: number) {}
}
