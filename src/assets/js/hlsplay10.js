let mseSourceBuffer10
let mseStreamingStarted10 = false
const mseQueue10 = []
let ws10
  function callhls10(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming9')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws10 = new WebSocket(url)
      ws10.binaryType = 'arraybuffer'
      ws10.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws10.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer10 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer10.mode = 'segments'
          mseSourceBuffer10.addEventListener('updateend', pushPacket10)
        } else {
          readPacket10(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket10 () {

    const videoEl2 = document.querySelector('#Streaming9')
    let packet

    if (!mseSourceBuffer10.updating) {
      if (mseQueue10.length > 0) {
        packet = mseQueue10.shift()
        mseSourceBuffer10.appendBuffer(packet)
      } else {
        mseStreamingStarted10 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket10 (packet) {
    if (!mseStreamingStarted10) {
      mseSourceBuffer10.appendBuffer(packet)
      mseStreamingStarted10 = true
      return
    }
    mseQueue10.push(packet)
    if (!mseSourceBuffer10.updating) {
      pushPacket10()
    }
  }
  function StopWebSocket10()
  {
    ws10.close();
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
