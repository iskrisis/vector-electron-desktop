# Vector Electron Desktop
Simple Vector.im wrapped in electron to make desktop app. Most of the code is from [electron-quick-start](https://github.com/electron/electron-quick-start).


## How to build

```bash
npm install
npm start
```
## How to package into app

should be able to pack for three platforms, on any one of three platform 

```bash
npm install
npm run pack-linux
npm run pack-osx
npm run pack-windows
```

package will be placed under `dist/` folder, tar and zip if you like to distribute it (currently using tar, so only works on linux/osx)

```bash
# zip all under dist/
npm run zip
# or
npm run zip-linux
npm run zip-osx
npm run zip-windows
```

Better automatic build should be possible with [electron-builder](https://github.com/electron-userland/electron-builder).

## Roadmap

* [ ] Packaging scripts for major OS
* [ ] Badges
* [ ] Dynamicly loads html/js/css
