[#macOS](macOS) [#Cocoa](Cocoa) [#Carbon](Carbon)
- [https://developer.apple.com/documentation/coregraphics/cgevent](https://developer.apple.com/documentation/coregraphics/cgevent)

- キー入力・マウス入力などのイベントは、[[I O Kit]]を通じてウィンドウサーバーのイベントキューに入り、ウィンドウサーバーは[[Quartz Event]]を作成する。
- [[Quartz Event]]はCarbon Event Managerに拾われて、適切なハンドラーに渡される
- アプリケーションは[[Event Tap]]を用いてアクセスできる

サンプルコード
グローバルなキー入力イベントを取得する
```main.swift
import Foundation
import Cocoa

let eventMask: CGEventMask = (1 << CGEventType.keyDown.rawValue) | (1 << CGEventType.keyUp.rawValue)
guard let eventTap = CGEvent.tapCreate(tap: .cgSessionEventTap, place: .headInsertEventTap, options: .defaultTap, eventsOfInterest: eventMask, callback: {(proxy, type, event, refcon) in
    print("Key event \(type) received.")
    return Unmanaged.passUnretained(event)
}, userInfo: nil) else {
	// あらかじめシステム環境設定のアクセシビリティで、イベントのハンドリングを許可してあげる必要がある。
    print("failed to create event tap")
    exit(1)
}

let runLoopSource = CFMachPortCreateRunLoopSource(kCFAllocatorDefault, eventTap, 0)
CFRunLoopAddSource(CFRunLoopGetCurrent(), runLoopSource, .commonModes)
CGEvent.tapEnable(tap: eventTap, enable: true)
CFRunLoopRun()

```
