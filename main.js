const { app, BrowserWindow, Menu } = require("electron");
const windowStateKeeper = require("electron-window-state");

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win;
let menu;

let template = [
  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        role: "reload",
        id: "reload"
      },
      {
        label: "Always On top",
        id: "alwaysOnTop",
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.isAlwaysOnTop()
              ? focusedWindow.setAlwaysOnTop(false)
              : focusedWindow.setAlwaysOnTop(true);
          }
        }
      }
    ]
  }
];

function createWindow() {
  // 设置默认宽高
  let mainWindowState = windowStateKeeper({
    defaultWidth: 400,
    defaultHeight: 233
  });

  // 创建浏览器窗口。
  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    frame: false,
    show: false,
    // opacity: 0.9,
    title: "Moment",
    icon: "./img/moment.png",
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(win);

  // 加载index.html文件
  win.loadFile("index.html");

  // 加载网页
  // win.loadURL("https://zophyr.com/moment");

  // 打开开发者工具
  // win.webContents.openDevTools();

  // 当 loading 结束时候，再显示，防止白屏
  win.on("ready-to-show", function() {
    win.show();
    win.focus();
  });

  // 当 window 被关闭，这个事件会被触发。
  win.on("closed", () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null;
    menu = null;
  });

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(null);
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on("ready", createWindow);

// 当全部窗口关闭时退出。
app.on("window-all-closed", () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow();
  }
});

// 取消硬件加速，提高兼容性
app.disableHardwareAcceleration();

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
