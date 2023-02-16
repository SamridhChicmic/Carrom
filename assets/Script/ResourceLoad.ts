import {
  _decorator,
  Component,
  Node,
  resources,
  SpriteFrame,
  Sprite,
  ImageAsset,
  Asset,
  tween,
  Input,
  director,
} from "cc";
import { Singleton } from "./Singleton";
const { ccclass, property } = _decorator;
@ccclass("ResourceLoad")
export class ResourceLoad extends Component {
  LoadingNode: Node;
  StartButton: Node;

  // SceneChange
  sceneChange() {
    director.loadScene("GamePlay");
  }
  async loadLogo() {
    let newObj = Singleton.getInstance();
    let pro = await newObj.loadResource("/Carrom/Background");
    console.log(pro);
    this.node.getChildByName("Logo").getComponent(Sprite).spriteFrame =
      newObj.spriteArray[1];
    // after load of dynamic logo inactive the loading nodes
    this.node.getChildByName("Loader").active = false;
    this.LoadingNode.active = false;
    this.StartButton.active = true;
  }
  onLoad() {
    //inactive the start button
    this.StartButton = this.node.getChildByName("StartButton");
    this.StartButton.active = false;

    //touchEvent on startbutton(1vs1)
    this.StartButton.on(Input.EventType.TOUCH_START, this.sceneChange, this);
    // loading node tween
    this.LoadingNode = this.node.getChildByName("LoaderCircle");
    tween(this.LoadingNode).by(1, { angle: -360 }).repeatForever().start();

    // delaying the dynamic load
    setTimeout(() => {
      console.log("set");
      this.loadLogo();
    }, 1000);
  }
  start() {
    // delaying the resource load for showing loading screen
  }

  update(deltaTime: number) {}
}

// onLoad(){
// load background with image asset
// this.dynamicLoadImageAsset("/Carrom/Background/bg", "Background");
//  this.dynamicLoad("/Carrom/Background/bg/spriteFrame", "Background");

//load directory
//this.dynamicLoadDirectory("/Carrom/Background", "Background");

// load logo with sprite
//this.dynamicLoad("/Carrom/Background/logo/spriteFrame", "Logo");
//}
// // dynamic load code
// dynamicLoad(path: string, childName: string) {
//   resources.load(path, SpriteFrame, (err, spriteFrame) => {
//     console.log(spriteFrame);
//     this.node.getChildByName(childName).getComponent(Sprite).spriteFrame =
//       spriteFrame;
//   });
// }

// dynamicLoadImageAsset(path: string, childName: string) {
//   //image asset
//   resources.load(path, ImageAsset, (err: any, imageAsset) => {
//     this.node.getChildByName(childName).getComponent(Sprite).spriteFrame =
//       SpriteFrame.createWithImage(imageAsset);
//   });
// }

// // directory load

// dynamicLoadDirectory(path: string, childName: string) {
//   resources.loadDir(path, SpriteFrame, (err, assets) => {
//     this.node.getChildByName(childName).getComponent(Sprite).spriteFrame =
//       assets.;
//   });
// }
