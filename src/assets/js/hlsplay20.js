let mseSourceBuffer20
let mseStreamingStarted20 = false
const mseQueue20 = []
let ws20
  function callhls20(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming19')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws20 = new WebSocket(url)
      ws20.binaryType = 'arraybuffer'
      ws20.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws20.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer20 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer20.mode = 'segments'
          mseSourceBuffer20.addEventListener('updateend', pushPacket20)
        } else {
          readPacket20(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket20 () {

    const videoEl2 = document.querySelector('#Streaming19')
    let packet

    if (!mseSourceBuffer20.updating) {
      if (mseQueue20.length > 0) {
        packet = mseQueue20.shift()
        mseSourceBuffer20.appendBuffer(packet)
      } else {
        mseStreamingStarted20 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket20 (packet) {
    if (!mseStreamingStarted20) {
      mseSourceBuffer20.appendBuffer(packet)
      mseStreamingStarted20 = true
      return
    }
    mseQueue20.push(packet)
    if (!mseSourceBuffer20.updating) {
      pushPacket20()
    }
  }
  function StopWebSocket20()
  {
    ws20.close();
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
