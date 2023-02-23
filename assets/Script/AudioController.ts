import { _decorator, Component, Node, AudioSource } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AudioController")
class AudioController {
  private static _instance: AudioController = null;
  private _audioSource: AudioSource = null;
  private AudioController() {}
  public static getInstance(): AudioController {
    if (!AudioController._instance) {
      AudioController._instance = new AudioController();
    }
    return AudioController._instance;
  }
}
