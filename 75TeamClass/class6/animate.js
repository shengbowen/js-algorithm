function Animator(duration, update, easing) {
  this.duration = duration;
  this.update = update;
  this.easing = easing;
}

Animator.prototype = {
  construtor: 'Animator',

  animate: function() {
    let startTime = 0,
        duration = this.duration,
        update = this.update,
        easing = this.easing,
        self = this;

    return new Promise((resolve, reject) => {
      let qId = 0;

      function step(timestamp) { //  DOMHighResTimeStamp  指示当前时间距离开始触发requestAnimationFrame 的回调的时间, 与 Date.now的时间戳格式不一样
        startTime = startTime || timestamp;
        let p = Math.min(1.0, (timestamp - startTime) / duration);

        update.call(self, easing ? easing(p) : p, p);

        if (p < 1.0) {
          qId = requestAnimationFrame(step);
        } else {
          resolve(self);
        }
      }

      self.cancel = function() {
        cancelAnimationFrame(qId);
        update.call(self, 0, 0);
        reject('User Canceled');
      }

      qId = requestAnimationFrame(step);
    });
  }
}