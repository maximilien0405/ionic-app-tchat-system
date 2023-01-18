import { DOCUMENT } from '@angular/common'
import { Directive, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core'
import { PluginListenerHandle } from '@capacitor/core'
import { Keyboard, KeyboardResize } from '@capacitor/keyboard'
import { Animation, AnimationController } from '@ionic/angular'

@Directive({
  selector: '[keyboardFlying]',
})
export class KeyboardFlyingDirective implements OnInit, OnDestroy {
  readonly input = this.elementReference.nativeElement

  private animation: Animation

  private keyboardWillShowListener?: PluginListenerHandle
  private keyboardWillHideListener?: PluginListenerHandle

  private resizeModeBackup?: KeyboardResize

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementReference: ElementRef<HTMLElement>,
    private animationController: AnimationController
  ) {
    // https://gist.github.com/jondot/1317ee27bab54c482e87
    this.animation = this.animationController
      .create()
      .addElement(elementReference.nativeElement)
      .easing('cubic-bezier(.17,.54,.42,.79)')
      .duration(250)
  }

  ngOnInit(): void {
    const safeAreaTop = Number.parseInt(
      getComputedStyle(this.document.documentElement).getPropertyValue(
        '--ion-safe-area-bottom'
      ),
      10
    )

    void Keyboard.getResizeMode().then(({ mode }) => {
      this.resizeModeBackup = mode
      void Keyboard.setResizeMode({ mode: KeyboardResize.None })
    })

    void Keyboard.addListener('keyboardWillShow', ({ keyboardHeight }) => {
      const toValue = (keyboardHeight) * -1
      this.animation.keyframes([
        { offset: 1, transform: `translate3d(0, ${toValue}px, 0)` },
      ])
      void this.animation.play()
    }).then((listener) => {
      this.keyboardWillShowListener = listener
    })

    void Keyboard.addListener('keyboardWillHide', () => {
      this.animation.keyframes([{ offset: 1, transform: 'translate3d(0, 0, 0)' }])
      void this.animation.play()
    }).then((listener) => {
      this.keyboardWillHideListener = listener
    })
  }

  ngOnDestroy(): void {
    if (this.resizeModeBackup) {
      void Keyboard.setResizeMode({ mode: this.resizeModeBackup })
    }

    if (this.keyboardWillShowListener) {
      void this.keyboardWillShowListener.remove()
    }

    if (this.keyboardWillHideListener) {
      void this.keyboardWillHideListener.remove()
    }
  }
}
