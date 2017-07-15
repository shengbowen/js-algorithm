var PreLoad = function(tasks, options) {
  var options = options || {};
  this.source = tasks;
  this.count = 0;
  this.total = tasks.length;
  this.onload = options.onload;
  this.prefix = options.prefix || '';
  this.init();
}

PreLoad.prototype.init = function() {
  var self = this;
  self.source.forEach(function(item) {
    var type = item.replace(/[#\?].*$/, '').substr(item.lastIndexOf('.') + 1).toLowerCase(),
        url = self.prefix + item;

    switch(type) {
      case 'js':
        self.script.call(self, url); break;
      case 'css':
        self.stylesheet.call(self, url); break;
      case 'svg':
      case 'jpg':
      case 'gif':
      case 'png':
      case 'jpeg':
        self.image.call(self, url);
    }
  })
};

PreLoad.prototype.getProgress = function() {
  return Math.round(this.count / this.total * 100);
}

PreLoad.prototype.image = function(url) {
  var img = document.createElement('img');
  this.load(img, url);
  img.src = url;
}

PreLoad.prototype.stylesheet = function(url) {
  var css = document.createElement('link');
  this.load(css, url);
  link.ref='stylesheet';
  link.href=url;
  document.head.appendChild(link);
}

PreLoad.prototype.script = function(url) {
  var js = document.createElement('script');
  this.load(js, url);
  js.src = url;
  document.head.appendChild(js);
}

PreLoad.prototype.load = function(ele, url) {
  var self = this;
  ele.onload = a.onerror = a.onabort = function(ele) {
    self.onload && self.onload({
      count: ++self.count,
      total: self.total,
      item: url,
      type: ele.type
    })
  }
}


  var tasks = ["images/iaiywb3m.png", "images/iag5o8a2.png", "images/iap156yp.png", "images/iaorf0of.png", "images/iap8pd5t.png", "images/iaorsnkg.png", "images/iaorty8s.png", "images/iaoruybk.png", "images/iaorvi2h.png", "images/iaos09fi.png", "images/iaos0q1g.png", "images/iaos1a8m.png", "images/iag6elbt.png", "images/iaos1ueu.png", "images/iag6j08y.png", "images/iag6jnqa.png", "images/iag6jnqs.png", "images/iag6jnrc.png", "images/iag6jnrq.png", "images/iaos37kv.png", "images/iaouck3d.png", "images/iaouchfr.png", "images/iaoucefw.png", "images/iaoudf44.png", "images/iaouehzu.png", "images/iag6yh96.png", "images/iaouf8vl.png", "images/iaouk8ge.png", "images/iaoull6y.png", "images/iaoukh77.png", "images/iaoukk5f.png", "images/iaoukmlh.png", "images/iaoukpgb.png", "images/iaoukruz.png", "images/iaoum1qu.png", "images/iaoum4f6.png", "images/iaoulslr.png", "images/iaoulv3z.png", "images/iaoulxl9.png", "images/iaoxw30f.png", "images/iahs9fy0.png", "images/iaoxwan3.png", "images/iaoxwm8u.png", "images/iaoxwsnq.png", "images/iaoxwy2s.png", "images/iaoxx57y.png", "images/iahs8o0e.png", "images/iagdo758.png", "images/iahsczx4.png", "images/iaoy0qjt.png", "images/iaoy0wn5.png", "images/iaoy12bm.png", "images/iaoy19ru.png", "images/iaoy1ge9.png", "images/iahsazqg.png", "images/ianjmap8.png", "images/ianm3v1n.png", "images/ianm51dr.png", "images/ianm5kx9.png", "images/ianm5yv6.png", "images/ianm6z3i.png", "images/ianm7kur.png", "images/iaoyo74j.png", "images/iaoyope2.png", "images/iaoyp1tg.png", "images/iaoypkhh.png", "images/iaoysw2a.png", "images/iaoytezg.png", "images/iaoyt95t.png", "images/iaoyu9nn.png", "images/iaoyuch8.png", "images/iaoywj4y.png", "images/iaoyxd21.png", "images/iaoywlls.png", "images/iaoyxfqr.png", "images/iagg8uw9.png", "images/iagg957z.png", "images/iagg9laa.png", "images/iaoz11mt.png", "images/iaggceq8.png", "images/iaggceqs.png", "images/iaggceso.png"]

  function loading(load) {
    var count = load.count;
    var total = load.total;

    var percent = Math.ceil(100*count/total)
    if(count == total) {
      console.log(done);
    }
  }

  new PreLoad(tasks, { onload: loading })
