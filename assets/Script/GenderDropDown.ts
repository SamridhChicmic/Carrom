import { _decorator, Component, Node, UITransform, Label, EditBox } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GenderDropDown")
export class GenderDropDown extends Component {
  @property(Node)
  Scroll: Node = null;
  @property(Node)
  ScrollBar: Node = null;
  @property(Node)
  Bar: Node = null;
  @property(Node)
  View: Node = null;
  DropButtonClicked: Boolean = false;
  @property(Node)
  GenderEdit: Node = null;

  // view 63.647
  //bar 66.277
  // scrollbar 69.443
  // scroll 73.124

  genderSelected(text) {
    console.log(text.target._children[0].getComponent(Label).string);
    //  console.log(text);
    this.GenderEdit.getComponent(EditBox).string =
      text.target._children[0].getComponent(Label).string;
    this.dropDownFunction(0, 0, 0, 0);
    this.DropButtonClicked = false;
  }
  dropDownFunction(
    scrollheight: number,
    scrollbarheight: number,
    barheight: number,
    viewheight: number
  ) {
    this.Scroll.getComponent(UITransform).height = scrollheight;
    this.ScrollBar.getComponent(UITransform).height = scrollbarheight;
    this.Bar.getComponent(UITransform).height = barheight;
    this.View.getComponent(UITransform).height = viewheight;
  }
  dropDownButton() {
    console.log("Gender Drop Down Button Click");
    if (this.DropButtonClicked == false) {
      this.DropButtonClicked = true;
      console.log("Button Clicked Scroll down");
      this.dropDownFunction(73.123, 69.443, 66.277, 63.647);
    } else {
      this.DropButtonClicked = false;
      console.log("Gender Button Clicked Scroll UP");
      this.dropDownFunction(0, 0, 0, 0);
    }
  }
  start() {}

  update(deltaTime: number) {}
}
