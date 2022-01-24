// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// const { contextBridge, desktopCapturer } = require('electron');
const { desktopCapturer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
  'electron',
  {
    async listScreens() {
      const sources = await desktopCapturer.getSources({ types: ['screen', 'window'] })
      return sources.map(s => {
        return {
          ...s,
          thumbnail: s.thumbnail.toDataURL()
        }
      });
    }
  }
)
