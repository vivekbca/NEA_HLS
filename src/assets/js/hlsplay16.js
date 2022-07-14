let mseSourceBuffer16
let mseStreamingStarted16 = false
const mseQueue16 = []
let ws16
  function callhls16(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming15')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws16 = new WebSocket(url)
      ws16.binaryType = 'arraybuffer'
      ws16.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws16.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer16 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer16.mode = 'segments'
          mseSourceBuffer16.addEventListener('updateend', pushPacket16)
        } else {
          readPacket16(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket16 () {

    const videoEl2 = document.querySelector('#Streaming15')
    let packet

    if (!mseSourceBuffer16.updating) {
      if (mseQueue16.length > 0) {
        packet = mseQueue16.shift()
        mseSourceBuffer16.appendBuffer(packet)
      } else {
        mseStreamingStarted16 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket16 (packet) {
    if (!mseStreamingStarted16) {
      mseSourceBuffer16.appendBuffer(packet)
      mseStreamingStarted16 = true
      return
    }
    mseQueue16.push(packet)
    if (!mseSourceBuffer16.updating) {
      pushPacket16()
    }
  }
  function StopWebSocket16()
  {
    ws16.close();
   console.log("Websocket Close")
  }
  // const videoEl = document.querySelector('#mse-video')
  

  // fix stalled video in safari
  // videoEl.addEventListener('pause', () => {
  //   if (videoEl.currentTime > videoEl.buffered.end(videoEl.buffered.length - 1)) {
  //     videoEl.currentTime = videoEl.buffered.end(videoEl.buffered.length - 1) - 0.1
  //     videoEl.play()
  //   }
  // })
