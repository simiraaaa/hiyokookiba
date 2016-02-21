/// <reference path="phina.js"/>

phina.define('MyAssetLoader', {
  _static: {
    
    order: [
      'image','ss','ssjson','se','bgm'
    ],
    
    toName: {
      ss: '�X�v���C�g�V�[�g',
      image: '�摜',
      ssjson: '�X�v���C�g�V�[�g�p�̃A�j���[�V������`�t�@�C��(json)',
      se: '���ʉ�',
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

    },
    loaderMap: {
      image: function (value) {

      },

      ss: function (value) {


      },

      ssjson: function (value) {


      },

      se: function (value) {


      },

      bgm: function (value) {


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
      ssjson:SSJSON,
    }

    var _a = {
      image: [

      ],
      ss: [
        {
          name: '�g�}�s�Rss',
          src: 'tomapiko_ss.png',
          desc: '�g�}�g�̂Ђ悱�I�X�A1�h�b�g1px�o�[�W����'
        },
        {
          name: '�~�J�����ss',
          src: 'mikachan_ss.png',
          desc: '�݂���̂Ђ悱���X�A1�h�b�g1px�o�[�W����'
        },

        {
          name: '�~�J�����ss',
          src: 'mikachan_ss_2x.png',
          desc: '�݂���̂Ђ悱���X�A1�h�b�g2px�o�[�W����'
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
      v.src = paths[k] + v.src;
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
      return document.body;
    }
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
  }
});

phina.define('StartScene', {
  superClass: phina.app.Scene,

  init: function () {
    this.superInit();
    MyAssetLoader.loadAssets(function () {
      MyAssetLoader.addMenu();
    });
  },
  _defined: function () {
    this.SINGLETON = this();
  }
});

phina.main(function () {
  var app = phina.display.CanvasApp({
    append: false,
    fit: false,

  });

  app.run();
});