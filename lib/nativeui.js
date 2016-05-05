var nw = require('nw.gui');

var windowMenu = new nw.Menu({
  type: 'menubar'
});

//adds bult in mac menus
// from https://github.com/dicksont/nwjs-osx-menu/blob/master/index.js
if (process.platform === "darwin") {
  windowMenu.createMacBuiltin('My App');
}
//assigning window menu to window
nw.Window.get().menu = windowMenu;

//
var aboutMenu = new nw.Menu();

//add to windowMenu
windowMenu.append(new nw.MenuItem({
  label: 'about',
  submenu: aboutMenu
}));

aboutMenu.append(new nw.MenuItem({
  label: 'about',
  click: function(){
    alert('for autoEdit support email pietro@autoedit.io');
  },
  key: "s",
  modifiers: "cmd-alt"
}));


//submenu region TRANSCRIPTS
var transcriptsMenu = new nw.Menu();

//add to windowMenu
windowMenu.append(new nw.MenuItem({
  label: 'Videos',
  submenu: transcriptsMenu
}));

//
transcriptsMenu.append(new nw.MenuItem({
  label: 'Videos',
  click: function(){
    // window.location = './transcripts.html';
    // alert('transcripts')
   // document.getElementById('mainView').innerHTML= myApp.videosView();
   myApp.videosView();
  },
  key: "t",
  modifiers: "cmd-alt"
}));

transcriptsMenu.append(new nw.MenuItem({
  label: 'New Video',
  click: function(){
    // chooseFile('#videoFileDialog');
    // alert('new transcript')
   myApp.videoNewView();
  },
  key: "t",
  modifiers: "cmd"
}));

transcriptsMenu.append(new nw.MenuItem({
  label: 'Delete all Videos',
  click: function(){
    // chooseFile('#videoFileDialog');
    confirm("you are about to delete all videos and transcriptions, are you sure? press ok to continue,cancel to stop");
      myApp.video.deleteAll();
      myApp.videosView();
  }//,
  // key: "d",
  // modifiers: "cmd"
}));


// PAPEREDIT
var paperEditMenu = new nw.Menu();

//add to windowMenu
windowMenu.append(new nw.MenuItem({
  label: 'PaperEdits',
  submenu: paperEditMenu
}));


paperEditMenu.append(new nw.MenuItem({
  label: 'PaperEdits',
  click: function(){
    // window.location = './paperedits.html';
     // alert('paperedits')
    myApp.paperEditsView();
  },
  key: "p",
  modifiers: "cmd-alt"
}));

paperEditMenu.append(new nw.MenuItem({
  label: 'New PaperEdit',
  click: function(){
   // alert('new PaperEdit');
    myApp.paperEditNewView();
  },
  key: "p",
  modifiers: "cmd"
}));

paperEditMenu.append(new nw.MenuItem({
  label: 'Delete all PaperEdits',
  click: function(){
    // chooseFile('#videoFileDialog');
    confirm("you are about to delete all paperedits, are you sure? press ok to continue,cancel to stop");
      myApp.paperedit.deleteAll();
      myApp.paperEditsView();
  }//,
  // key: "d",
  // modifiers: "cmd"
}));
