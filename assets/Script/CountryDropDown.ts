import {
  _decorator,
  Component,
  Node,
  UITransform,
  Prefab,
  JsonAsset,
  instantiate,
  Label,
  EditBox,
  Input,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("CountryDropDown")
export class CountryDropDown extends Component {
  @property(Node)
  Scroll: Node = null;
  @property(Node)
  ScrollBar: Node = null;
  @property(Node)
  Bar: Node = null;
  @property(Node)
  View: Node = null;
  @property(Node)
  Content: Node = null;

  DropButtonClicked: Boolean = false;

  @property(Prefab)
  ScrollChild: Prefab = null;
  @property(Node)
  CountryEditbox: Node = null;

  @property({ type: JsonAsset })
  CountryName: JsonAsset = null;

  // view 63.647
  //bar 66.277
  // scrollbar 69.443
  // scroll 73.124

  countrySelected(text) {
    console.log(text.target._children[0].getComponent(Label).string);
    //  console.log(text);
    this.CountryEditbox.getComponent(EditBox).string =
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
    console.log("Country Drop Down Button Click");
    if (this.DropButtonClicked == false) {
      this.DropButtonClicked = true;
      console.log("Button Clicked Scroll down");
      this.dropDownFunction(73.123, 69.443, 66.277, 63.647);
    } else {
      this.DropButtonClicked = false;
      console.log("Country Button Clicked Scroll UP");
      this.dropDownFunction(0, 0, 0, 0);
    }
  }
  countryAdd() {
    let Country = this.CountryName.json.Country;
    console.log("Country length", Country.length);
    for (let i = 0; i < Country.length; i++) {
      let Child = instantiate(this.ScrollChild);
      Child.getChildByName("Label").getComponent(Label).string =
        Country[i].Name;
      Child.on(Input.EventType.TOUCH_START, this.countrySelected, this);
      this.Content.addChild(Child);
    }
  }
  onLoad() {
    this.countryAdd();
  }
  start() {}

  update(deltaTime: number) {}
}
