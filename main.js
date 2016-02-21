/// <reference path="phina.js"/>

phina.define('MyAssetLoader', {
  _static: {

    order: [
      'image', 'ss', 'ssjson', 'se', 'bgm'
    ],

    toName: {
      ss: 'スプライトシート',
      image: '画像',
      ssjson: 'スプライトシート用のアニメーション定義ファイル(json)',
      se: '効果音',
      bgm: 'BGM',

    },
    BASE: "https://raw.githubusercontent.com/simiraaaa/hiyokookiba/master/",
    assets: {

    },
    loadAssets: function (f) {
      var assets = this.assets;
      var self = this;
      var endcount = 0;
      assets.forIn(function (k, v) {
        endcount++;
        self._load(k, v, function () {
          endcount--;
          if (endcount) return;
          f && f();
        });
      });
    },

    _load: function (type, values, f) {
      var endcount = 0;
      var self = this;
      values.forEach(function (e) {
        ++endcount;
        self.loaderMap[type].call(self, e, function () {
          --endcount;
          if (endcount) return;
          f && f();
        });
      });
    },
    addMenu: function () {
      var dom = DOMManager.SINGLETON;

      var menu = dom.getMenuParent();
      var order = this.order;
      var toName = this.toName;
      var menus = [];
      menu.innerHTML = '';
      var self = this;
      order.forEach(function (e) {
        var tag = document.createElement('button');
        tag.textContent = toName[e];
        tag.onclick = function () {
          self.addContent(e);
        };
      });

    },

    addContent: function (type) {
      var assets = this.loadedAssets[type];
      var content = dom.SINGLETON.getContentParent;
      assets.forEach(function (e) {
        content.appendChild(e);
      });
    },

    loadedAssets: {
      image: [],
      ss: [],
      ssjson: [],
      se: [],
      bgm: [],
    },
    loaderMap: {
      image: function (value, f) {
      },

      ss: function (value, f) {

        var tag = document.createElement('div');
        var name = document.createElement('a');
        name.href = value.src;
        tag.appendChild(name).textContent = value.name;
        tag.appendChild(document.createElement('div')).textContent = value.desc;
        var asset = document.createElement('div');
        var a = name.cloneNode();
        var img = document.createElement('img');
        img.src = value.src;
        a.appendChild(img);
        asset.appendChild(a);
        tag.appendChild(asset);
        this.loadedAssets.image.push(tag);
        f && f();

      },

      ssjson: function (value, f) {


      },

      se: function (value, f) {


      },

      bgm: function (value, f) {


      },
    }
  },
  _defined: function () {

    var BASE = this.BASE;

    var IMAGE = 'image/';
    var SS = IMAGE + 'ss/';
    var SOUND = 'sound/';
    var SE = SOUND + 'se/';
    var BGM = SOUND + 'bgm/';

    var SSJSON = 'ssjson/';

    var paths = {
      image: IMAGE,
      ss: SS,
      se: SE,
      bgm: BGM,
      ssjson: SSJSON,
    }

    var _a = {
      image: [

      ],
      ss: [
        {
          name: 'トマピコss',
          src: 'tomapiko_ss.png',
          desc: 'トマトのひよこオス、1ドット1pxバージョン'
        },
        {
          name: 'ミカちゃんss',
          src: 'mikachan_ss.png',
          desc: 'みかんのひよこメス、1ドット1pxバージョン'
        },

        {
          name: 'ミカちゃんss',
          src: 'mikachan_ss_2x.png',
          desc: 'みかんのひよこメス、1ドット2pxバージョン'
        },
      ],
      ssjson: [

      ],
      se: [

      ],
      bgm: [

      ],
    }
    
    _a.forIn(function (k, v) {
      v.forEach(function (v) { v.src = BASE + paths[k] + v.src; });
    });

    this.assets = _a;
  }

});

+function () {


  var DOMManager = phina.define('DOMManager', {
    superClass: phina.util.EventDispatcher,

    init: function () {
      this.superInit();

    },

    getMenuParent: function () {
      return document.getElementById('menu');
    },
    getContentParent: function () {
      return document.getElementById('content');
    },

    _defined: function () {
      this.SINGLETON = this();
    },
  });

}();

phina.define('PageManager', {
  superClass: phina.game.ManagerScene,

  init: function () {
    this.superInit({
      startLabel: 'start',
      scenes: [
        {
          label: 'start',
          className: 'StartScene',
        }
      ]
    });
  },
});

phina.define('StartScene', {
  superClass: phina.app.Scene,

  init: function () {
    this.superInit();
    document.body.appendChild(document.createElement('div')).id = 'menu';
    document.body.appendChild(document.createElement('div')).id = 'content';

    MyAssetLoader.loadAssets(function () {
      MyAssetLoader.addMenu();
    });
  }
});

phina.main(function () {
  var app = phina.display.CanvasApp({
    append: false,
    fit: false,

  });

  app.run();

  app.replaceScene(PageManager());
});