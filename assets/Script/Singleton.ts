import { _decorator, Component, Node, resources, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Singleton")
export class Singleton extends Component {
  static instance: Singleton = null;
  spriteArray: SpriteFrame[] = [];
  private Singleton() {}

  public static getInstance(): Singleton {
    if (this.instance === null) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
  loadResource(path: string) {
    return new Promise((resolve, reject) => {
      resources.loadDir(path, SpriteFrame, (err, asset) => {
        if (err) {
          console.log("reject");
          reject(err);
        } else {
          this.spriteArray = asset;
          //console.log(asset.length);
          resolve("exist");
        }
      });
    });
  }
  start() {}

  update(deltaTime: number) {}
}
