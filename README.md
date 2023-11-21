# esphome-web_keypad
A Lit Element web component htm webserver for esphome devices and adapted to dsc/vista alarm panel component 

###  Features

- 30 sec heartbeat showing node connection is active
- Built with Lit Element web components
- completely standalone - no other external dependancies  9K compressed
- Light and Dark themes
- Primary theme - currently light blue - can be overridden
- Entities are discovered and display
- No css fetch - index page fetches one js file
- added dsc/vista web keypad component

dark scheme desktop:
====================
![web_server-v2](https://user-images.githubusercontent.com/5050824/141174356-789cc160-46a1-43fc-9a86-ed5a764c35d7.png)

Light scheme on mobile:
=======================
![image](https://user-images.githubusercontent.com/5050824/141175240-95b5b74e-d8c8-48bc-9d6d-053ebeaf8910.png)

### Near future:

- [ ] Support for compressed files in flash for Standalone no internet nodes
- [ ] Add Climate
- [x] Add Select drop list
- [ ] Add Number editing
- [ ] Potentially use an optional card layout instead of a table

## Example entry for `config.yaml`:

```yaml
# Example config.yaml
## each included files will be downloaded automatically and compiled within the flash.  
## there will be no need for internet access when running.
web_keypad:
  port: 80  
  partitions: 1 # a keypad will be shown for each partition
  config_url: https://dilbert66.github.io/config_files/config_dsc.yml  
  js_url: https://dilbert66.github.io/js_files/www.js
  ## If you prefer to use locally hosted compile time files comment two lines above and uncomment below
  #js_include: ./www.js    
  #config_local: ./config_dsc.yml    
```

development
===========

```
https://github.com/Dilbert66/esphome-webserver-custom.git
pnpm install
```

`npm run start`
Starts a dev server on http://localhost:3000

proxy
======
Events from a real device can be proxied for developement. Update this line in `vite.config.ts` to point to your real device

const proxy_target = "http://nodemcu.local";

The json api will POST to the real device and the events are proxied

build
=====
`npm run build`
The build files are copied to static/v2 usually for deployment to https://esphome.io/static/v2 or your /local/www homeassistant folder

If you customise, you can deploy to your local homeassistant /local/www/_static/v2 and use:

```yaml
web_keypad:
  port: 80
  version: 2
  partitions: 1  # a keypad will be shown for each partition
  config_url: http://homeassistant.local:8123/local/_static/v2/config_dsc.yml   
  js_url: http://homeassistant.local:8123/local/_static/v2/www.js

```

serve
=====
`npm run server`
Starts a production test server on http://localhost:5001
Events and the json api are proxied.
