const path = require('path');

module.exports = {
  "lintOnSave": false,
  "devServer": {
    port: 80,
    "proxy": {
      "/api": {
        "target": "http://localhost:3000",
        "ws": true,
        "changeOrigin": true
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}