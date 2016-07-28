# Vector Electron Desktop
Simple Vector.im wrapped in electron to make desktop app. Most of the code is from [electron-quick-start](https://github.com/electron/electron-quick-start).


## How to build
```
npm install
npm start
```

## How to package into app
Change --platform= and --arch more is at [electron-packager](https://github.com/electron-userland/electron-packager)
```
npm install
electron-packager . Vector --platform=darwin --arch=x64 --icon icons/icon
```


Better automatic build should be possible with [electron-builder](https://github.com/electron-userland/electron-builder).
