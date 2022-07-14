let mseSourceBuffer17
let mseStreamingStarted17 = false
const mseQueue17 = []
let ws17
  function callhls17(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming16')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws17 = new WebSocket(url)
      ws17.binaryType = 'arraybuffer'
      ws17.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws17.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer17 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer17.mode = 'segments'
          mseSourceBuffer17.addEventListener('updateend', pushPacket17)
        } else {
          readPacket17(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket17 () {

    const videoEl2 = document.querySelector('#Streaming16')
    let packet

    if (!mseSourceBuffer17.updating) {
      if (mseQueue17.length > 0) {
        packet = mseQueue17.shift()
        mseSourceBuffer17.appendBuffer(packet)
      } else {
        mseStreamingStarted17 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket17 (packet) {
    if (!mseStreamingStarted17) {
      mseSourceBuffer17.appendBuffer(packet)
      mseStreamingStarted17 = true
      return
    }
    mseQueue17.push(packet)
    if (!mseSourceBuffer17.updating) {
      pushPacket17()
    }
  }
  function StopWebSocket17()
  {
    ws17.close();
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
