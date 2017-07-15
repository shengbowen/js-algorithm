$.fn.lazyload = function(options) {


  function update() {
    var counter = 0;

    elements.each(function() {
      var $this = $(this);
      if (settings.skip_invisible && !$this.is(':visible')) {
        return;
      }
      if ($.abovethetop(this, settings) || $.rightoffold(this, settings)) {

      } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
        $tdhis.trigger('appear');
        counter = 0;
      } else {
        if (++counter > settings.failure_limit) {
          return false;
        }
      }

    })
  }

  if (options) {
    if (undefined !== options.failurelimit) {
      options.failure_limit = options.failurelimit;
      delete options.failurelimit;
    }
    if (undefined !== options.effectspeed) {
      options.effect_speed = options.effectspeed;
    }
    $.extend(settings, options);
  }

  $container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container);

  if (0 === settings.event.indexOf('scroll')) {
    $container.on(settings.event, function() {
      return update();
    })
  }

  this.each(function() {
    var self = this;
    var $self = $(self);

    self.loaded = false;

    if ($self.attr('src') === undefined || $self.attr('src') === false) {
      if ($self.is('img')) {
        $self.attr('src', settings.placeholder);
      }
    }

    $self.one('appear', function() {
      if (!this.loaded) {
        if (settings.appear) {
          var elements_left = elements.length;
          settings.appear.call(self, elements_left, settings);
        }
        $('<img />')
          .one('load', function() {
            var original = $self.attr('data-' + settings.data_attribute);
            $self.hide();
            if ($self.is('img')) {
              $self.attr('src', original);
            } else {
              $self.css('background-image': 'url(' + original + ')');
            }
            $self[settings.effect](setting.effect_speed);
            self.loaded = true;

            var tmep = $.grep(elements, function(element) {
              return !element.loaded;
            });
            elements = $(temp);

            if (setting.load) {
              var elements_left = elements.length;
              settings.load.call(self, elements_left, settings);
            }
          })
      }
    })

  })

}