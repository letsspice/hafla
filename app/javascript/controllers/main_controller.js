// app/javascript/controllers/main_controller.js

import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["flash", "progressBar"]

  connect() {
    this.startFlashTimer()
  }

  startFlashTimer() {
    if (this.hasFlashTarget) {
      this.progress = 100
      this.intervalId = setInterval(() => {
        this.progress -= 1
        this.progressBarTarget.style.width = `${this.progress}%`

        if (this.progress <= 0) {
          clearInterval(this.intervalId)
          this.flashTarget.classList.add('hidden')
        }
      }, 50)
    }
  }

  closeFlash() {
    if (this.hasFlashTarget) {
      this.flashTarget.classList.add('hidden')
    }
  }

}